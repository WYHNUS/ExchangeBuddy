import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './AddSectionDialog';

// react-komposer
const composer = (props, onData) => {
  const { about, groupId } = props;

  if (!groupId)
    return;

  Meteor.call('Group.get', groupId, (err, group) => {

    if (!group)
      return;

    if (about == 'country')
      Meteor.call('Country.getEmptySections', group.university.countryCode, (err, sections) => {
        onData(null, { group, sections });
      });

    else if (about == 'university')
      Meteor.call('University.getEmptySections', group.universityId, (err, sections) => {
        onData(null, { group, sections });
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
