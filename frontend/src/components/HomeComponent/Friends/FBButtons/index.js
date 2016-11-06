import React from 'react';

import ChildComponent from './FBButtons';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showSnackbar } from '../../../../actions/messageSnackbar';

const mapDispatchToProps = (dispatch) => {
	return {
		clearUser: () => {
			dispatch(clearUser());
		},
		showSnackbar: (message) => {
			dispatch(showSnackbar(message))
		},
	};
};

const mapStateToProps = (state) => {
	return {
		userObject:state.user.userObject,
		homeGroupDetails: state.home.homeGroupDetails,
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);