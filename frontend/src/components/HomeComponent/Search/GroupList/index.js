import React from 'react';

import ChildComponent from './GroupList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {toggleHomeSearchDrawerVisibility} from '../../../../actions/pageVisibility';
import {toggleSelectedHomeGroup} from '../../../../actions/home';
import {toggleHomeTab} from '../../../../actions/home';
import {fetchCurrentGroup, fetchCurrentGroupSuccess, fetchCurrentGroupFailure,
	 fetchEvents, fetchEventsSuccess, fetchEventsFailure, resetEvents} from '../../../../actions/home'

	const mapDispatchToProps = (dispatch, ownProps) => {
		return {
			toggleHomeSearchDrawerVisibility: visibility=>dispatch(toggleHomeSearchDrawerVisibility(visibility)),
			toggleSelectedHomeGroup: index=>dispatch(toggleSelectedHomeGroup(index)),
			toggleHomeTab: tabValue=>dispatch(toggleHomeTab(tabValue)),
			fetchNewGroup: (groupId) => {
				dispatch(fetchEvents(groupId)).payload.then((response) => {
					if (!response.error) {
						dispatch(fetchEventsSuccess(response.data));
					} else {
						dispatch(fetchEventsFailure(response.error));
					}
				});
				dispatch(fetchCurrentGroup(groupId)).payload.then((response) => {
					if (!response.error) {
						dispatch(fetchCurrentGroupSuccess(response.data));
					} else {
						dispatch(fetchCurrentGroupFailure(response.error));
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