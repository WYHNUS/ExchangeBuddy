import React from 'react';

import ChildComponent from './GroupIndicator';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const mapStateToProps = (state) => {
	return {
		userObject:state.user.userObject,
		homeGroupDetails: state.home.homeGroupDetails
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
