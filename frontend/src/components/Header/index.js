import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';
import { browserHistory } from 'react-router';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from 'actions/messageSnackbar';
import { toggleHomeTab } from 'actions/home';
//import { openSwitchGroupDialog } from 'actions/switchGroupDialog';

// Component
import ChildComponent from './Header';


const mapStateToProps = (state, ownProps)=>{
	return {
		params: state.home.homeGroupDetails.homeGroupDetails,
		homeTabValue: state.home.homeTabValue,
		homeGroupDetails: state.home.homeGroupDetails,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		actions: bindActionCreators({ showSnackbar }, dispatch),
		toggleHomeTab:tab=>dispatch(toggleHomeTab(tab)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
