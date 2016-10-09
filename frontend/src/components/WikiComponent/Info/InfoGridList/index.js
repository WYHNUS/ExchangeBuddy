import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './InfoGridList';

// react-komposer
const composer = (props, onData) => {
  const { about, groupId } = props;

  if (!groupId)
    return;

  Meteor.call('Group.get', groupId, (err, group) => {

    if (!group)
      return;

    if (about == 'country')
      Meteor.call('Country.get', group.university.countryCode, (err, country) => {
        Meteor.call('Country.getInfoItems', group.university.countryCode, (err, items) => {

          onData(null, {
            group, items, title: country.name
          });

        });
      });

    else if (about == 'university')
      Meteor.call('University.getInfoItems', group.universityId, (err, items) => {

        onData(null, {
          group, items, title: group.university.name
        });

      });

  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    isMobile: state.browserIsMobileWidth
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
