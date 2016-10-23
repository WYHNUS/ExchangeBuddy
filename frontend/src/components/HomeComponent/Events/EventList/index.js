import React from 'react';
import Loading from '../../../Loading';

// Action creators
import { 
  resetEvents, goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,
  fetchEvents , fetchEventsFailure, fetchEventsSuccess
} from '../../../../actions/home';
import { showSnackbar } from '../../../../actions/messageSnackbar';
import {fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure} from '../../../../actions/utilityInfo';


// Component
import ChildComponent from './EventList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: (GroupId) => {
      dispatch(fetchEvents(GroupId)).payload.then((response) => {
        //console.log(response);
        if (!response.error) {
          dispatch(fetchEventsSuccess(response.body));
        } else {
          dispatch(fetchEventsFailure(response.error));
        }
      });
    },
    showSnackbar:(message)=>{
      dispatch(showSnackbar(message))
    },
    goForAnEventSuccessUpdate:(EventId, UserId)=>{
      dispatch(goForAnEventSuccessUpdate(EventId, UserId))
    },
    ungoForAnEventSuccessUpdate:(EventId, UserId)=>{
      dispatch(ungoForAnEventSuccessUpdate(EventId, UserId))
    },
    fetchEvents:(GroupId)=>{
      dispatch(fetchEvents(GroupId)).payload.then((response) => {
        if (!response.error) {
          dispatch(fetchEventsSuccess(response.body));
        } else {
          dispatch(fetchEventsFailure(response.error));
        }
      });
    },
    fetchAllUniversitiesSuccess:(data) => {
      dispatch(fetchAllUniversitiesSuccess(data));
    },
    fetchAllUniversitiesFailure:(data)=>{
      dispatch(fetchAllUniversitiesFailure(data));
    },
    resetEvents:()=>{
      dispatch(resetEvents());
    }

  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    homeEvents:state.home.homeEvents,
    homeGroupDetails:state.home.homeGroupDetails.homeGroupDetails,
    source: ownProps.source,
    user: state.user,
    universities: state.utilityInfo.universitiesList.universities
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
