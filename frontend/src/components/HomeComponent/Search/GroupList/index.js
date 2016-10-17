import React from 'react';

import ChildComponent from './GroupList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {toggleHomeSearchDrawerVisibility} from '../../../../actions/pageVisibility';
import {toggleSelectedHomeGroup} from '../../../../actions/home';
import {toggleHomeTab} from '../../../../actions/home';

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggleHomeSearchDrawerVisibility: visibility=>dispatch(toggleHomeSearchDrawerVisibility(visibility)),
		toggleSelectedHomeGroup: index=>dispatch(toggleSelectedHomeGroup(index)),
		toggleHomeTab: tabValue=>dispatch(toggleHomeTab(tabValue))
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