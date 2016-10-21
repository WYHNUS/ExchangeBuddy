import React from 'react';
import Loading from '../../../Loading';

// Component
import ChildComponent from './NewEventForm';

import {postEvents} from '../../../../actions/home'
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
					console.log(response.data);
					dispatch(showSnackbar('Posted an event!'));
				} else {
					console.log(response.error);
					dispatch(showSnackbar('Error in posting event'));
				}
			});
		},
		showSnackbar:(message)=>{dispatch(showSnackbar(message))}
	};
};

const mapStateToProps = (state) => {
	return {
		homeGroupDetails: state.home.homeGroupDetails,
		user: state.user
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
