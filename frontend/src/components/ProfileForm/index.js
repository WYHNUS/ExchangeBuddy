import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

// Component
import ChildComponent from './ProfileForm';
import { showSnackbar } from '../../actions/messageSnackbar';

import { connect } from 'react-redux';

import {editProfile, editProfileSuccess} from '../../actions/profile';

const mapDispatchToProps = (dispatch) => {
	return {
		editProfile: (userName, userPassword) => {
	      dispatch(editProfile(userName, userPassword))
	        .payload.then((response) => {
	          console.log(response, 'editprofile');
	          if (!response.error) {
	            dispatch(showSnackbar('Editted your profile'));
	            dispatch(editProfileSuccess(userName));
	          } else {
	            dispatch(showSnackbar('Error in editting profile'));
	          }
	        }, (err) => {
	          if (err.status === 401) {
	            cookie.remove('authToken');
	            dispatch(clearUser());
	            // need to redirect to a new version of login page
	            browserHistory.push('/');
	          } else {
	            console.log(err.response.error.message);
	            dispatch(showSnackbar(err.response.error.message));
	          }
	        });
	    }
	}
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile.userProfile.userProfile,
    userObject: state.user.userObject,
    universities: state.utilityInfo.universitiesList.universities
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);