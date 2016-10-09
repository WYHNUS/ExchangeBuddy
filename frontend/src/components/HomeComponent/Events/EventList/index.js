import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './EventList';

// react-komposer
/*const composer = (props, onData) => {
  const { source, uni } = props;
  const groupId = parseInt(props.groupId);

  if (groupId) {
    Meteor.call('Group.get', groupId, (err, group) => {

      if (!group)
        return;

      const { university } = group;

      if (source == 'Facebook') {
        // Temp: Don't pass in uniLatLng
        Meteor.call('Group.getFbEvents', university.countryCode, (err, groupEvents) => {
          onData(null, { groupEvents });
        });
      } else if (source == 'Meetup') {
        Meteor.call('Group.getMeetupEvents', university, (err, res) => {
          onData(null, { groupEvents: res.results });
        });
      }

    });
  }
};*/


// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    groupEvents:ownProps.groupEvents,
    groupId:ownProps.groupId,
    source: ownProps.source
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
