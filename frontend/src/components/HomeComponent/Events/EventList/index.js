import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import Loading from '../../../Loading';

// Action creators
import { 
  resetEvents, goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate, deleteAnEventSuccessUpdate
} from 'actions/home';
import { showSnackbar } from 'actions/messageSnackbar';
import { fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure } from 'actions/utilityInfo';
import { clearUser } from 'actions/authActions';


// Component
import ChildComponent from './EventList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    showSnackbar: (message) => {
      dispatch(showSnackbar(message))
    },
    goForAnEventSuccessUpdate: (EventId, user) => {
      dispatch(goForAnEventSuccessUpdate(EventId, user))
    },
    ungoForAnEventSuccessUpdate: (EventId, user) => {
      dispatch(ungoForAnEventSuccessUpdate(EventId, user))
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
    homeGroupDetails: state.home.homeGroupDetails,
    source: ownProps.source,
    user: state.user,
    universities: state.utilityInfo.universitiesList.universities
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
