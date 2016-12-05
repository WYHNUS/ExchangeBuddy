import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import ChildComponent from './GroupList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleHomeSearchDrawerVisibility } from 'actions/pageVisibility';
import { toggleSelectedHomeGroup } from 'actions/home';
import { toggleHomeTab } from 'actions/home';
import {
  fetchCurrentGroup, fetchCurrentGroupSuccess, fetchCurrentGroupFailure,
	fetchEvents, fetchEventsSuccess, fetchEventsFailure, resetEvents
} from 'actions/home';
import { clearUser } from 'actions/authActions';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleHomeSearchDrawerVisibility: visibility => dispatch(toggleHomeSearchDrawerVisibility(visibility)),
    toggleSelectedHomeGroup: index => dispatch(toggleSelectedHomeGroup(index)),
    toggleHomeTab: tabValue => dispatch(toggleHomeTab(tabValue)),
    fetchNewGroup: (groupId) => {
      dispatch(fetchCurrentGroup(groupId)).payload.then((response) => {
        if (!response.error) {
          dispatch(fetchCurrentGroupSuccess(response.body));
        } else {
          dispatch(fetchCurrentGroupFailure(response.error));
        }
      }, (err) => {
        if (err.status === 401) {
          cookie.remove('authToken');
          dispatch(clearUser());
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } else {
          dispatch(fetchCurrentGroupFailure(err.response.error.message));
        }
      });
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.userObject,
    groups: state.home.homeGroups.homeGroups,
    homeGroups: state.home.homeGroups,
    homeGroupDetails:state.home.homeGroupDetails.homeGroupDetails
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);