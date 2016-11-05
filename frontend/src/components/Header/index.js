import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';
import { browserHistory } from 'react-router';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../actions/messageSnackbar';
import {toggleHomeTab, addOnboardStep, startJoyride} from '../../actions/home';
//import { openSwitchGroupDialog } from '../../actions/switchGroupDialog';

// Component
import ChildComponent from './Header';


const mapStateToProps = (state, ownProps)=>{
	return {
		params: state.home.homeGroupDetails.homeGroupDetails,
		homeTabValue: state.home.homeTabValue,
		homeGroupDetails: state.home.homeGroupDetails,
		homeJoyride: state.home.homeJoyride,
		//addSteps: ownProps.addSteps
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		actions: bindActionCreators({ showSnackbar }, dispatch),
		toggleHomeTab:tab=>dispatch(toggleHomeTab(tab)),
		addOnboardStep:step=>{dispatch(addOnboardStep(step))}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
