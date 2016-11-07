import React from 'react';

import ChildComponent from './MemberList';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
	return {
	};
};

const mapStateToProps = (state) => {
	return {
		homeGroupDetails: state.home.homeGroupDetails
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
