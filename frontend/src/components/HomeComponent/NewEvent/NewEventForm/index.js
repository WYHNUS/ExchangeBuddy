import React from 'react';
import Loading from '../../../Loading';

// Component
import ChildComponent from './NewEventForm';

import {postEvents, fetchEvents, fetchEventsSuccess, fetchEventsFailure} from '../../../../actions/home'
import {showSnackbar} from '../../../../actions/messageSnackbar';

// Redux
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		postEvents:(lat, lng, location, title, startTime, endTime, detail, imgSrc, GroupId, UserId)=>{
			dispatch(postEvents(lat, lng, location, title, startTime, endTime, detail, imgSrc, GroupId, UserId))
			.payload.then((response) => {
				console.log(response);
				if (!response.error) {
					dispatch(showSnackbar('Posted an event!'));
					dispatch(fetchEvents(GroupId)).payload.then((response) => {
						if (!response.error) {
							dispatch(fetchEventsSuccess(response.body));
						} else {
							dispatch(fetchEventsFailure(response.error));
						}
					});
				} else {
					console.log(response.error);
					dispatch(showSnackbar('Error in posting event'));
				}
			});
		},
		showSnackbar:(message)=>{dispatch(showSnackbar(message))},
	};
};

const mapStateToProps = (state) => {
	return {
		homeGroupDetails: state.home.homeGroupDetails,
		user: state.user
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
