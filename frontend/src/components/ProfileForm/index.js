import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

// Component
import ChildComponent from './ProfileForm';
import { showSnackbar } from '../../actions/messageSnackbar';

import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		showSnackbar: (message) => { dispatch(showSnackbar(message)) }
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