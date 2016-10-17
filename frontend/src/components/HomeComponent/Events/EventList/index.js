import React from 'react';
import Loading from '../../../Loading';

// Action creators
import { fetchEvents, fetchEventsSuccess, fetchEventsFailure, resetEvents } from '../../../../actions/home';


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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: (GroupId) => {
      dispatch(fetchEvents(GroupId)).payload.then((response) => {
        //console.log(response);
        if (!response.error) {
          dispatch(fetchEventsSuccess(response.data));
        } else {
          dispatch(fetchEventsFailure(response.error));
        }
      });
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    groupEvents:state.home.homeEvents.homeEvents,
    groupId:state.home.homeGroupDetails.homeGroupDetails.id,
    source: ownProps.source
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
