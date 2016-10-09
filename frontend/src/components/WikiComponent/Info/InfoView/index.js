import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';
import { browserHistory } from 'react-router';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './InfoView';

// react-komposer
const composer = (props, onData) => {
  const { about, groupId, sectionId } = props;

  if (!groupId || !about)
    return;

  Meteor.call('Group.get', groupId, (err, group) => {

    if (!group)
      return browserHistory.push('/');

    if (about == 'country') {
      Meteor.call('CountryInfoItem.getLatestRevision', group.university.countryCode, sectionId, (err, item) => {
        if (!item)
          return browserHistory.push(`/group/${groupId}/info`);

        onData(null, {
          item,
          group,
          aboutId: group.university.countryCode
        });
      });
    } else if (about == 'university') {
      Meteor.call('UniversityInfoItem.getLatestRevision', group.universityId, sectionId, (err, item) => {
        if (!item)
          return browserHistory.push(`/group/${groupId}/info`);

        onData(null, {
          item,
          group,
          aboutId: group.universityId
        });
      });
    }

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
