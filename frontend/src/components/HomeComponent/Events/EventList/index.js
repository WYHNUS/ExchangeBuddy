import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import Loading from '../../../Loading';

// Action creators
import { 
  resetEvents, goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,
  fetchEvents , fetchEventsFailure, fetchEventsSuccess, deleteAnEventSuccessUpdate
} from '../../../../actions/home';
import { showSnackbar } from '../../../../actions/messageSnackbar';
import { fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure } from '../../../../actions/utilityInfo';
import { clearUser } from '../../../../actions/authActions';


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
      }, (err) => {
        if (err.status === 401) {
          cookie.remove('authToken');
          dispatch(clearUser());
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } else {
          dispatch(fetchEventsFailure(err.response.error.message));
        }
      });
    },
    showSnackbar: (message) => {
      dispatch(showSnackbar(message))
    },
    goForAnEventSuccessUpdate: (EventId, UserId) => {
      dispatch(goForAnEventSuccessUpdate(EventId, UserId))
    },
    ungoForAnEventSuccessUpdate: (EventId, UserId) => {
      dispatch(ungoForAnEventSuccessUpdate(EventId, UserId))
    },
    fetchAllUniversitiesSuccess: (data) => {
      dispatch(fetchAllUniversitiesSuccess(data));
    },
    fetchAllUniversitiesFailure: (data) => {
      dispatch(fetchAllUniversitiesFailure(data));
    },
    resetEvents: () => {
      dispatch(resetEvents());
    },
    clearUser: () => {
      dispatch(clearUser());
    },
    deleteAnEventSuccessUpdate: (EventId) =>{
      dispatch(deleteAnEventSuccessUpdate(EventId))
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    homeEvents: state.home.homeEvents,
    homeGroupDetails: state.home.homeGroupDetails.homeGroupDetails,
    source: ownProps.source,
    user: state.user,
    universities: state.utilityInfo.universitiesList.universities
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
