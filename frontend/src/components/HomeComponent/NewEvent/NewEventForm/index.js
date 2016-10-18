import React from 'react';
import Loading from '../../../Loading';

// Component
import ChildComponent from './NewEventForm';

import {postEvents} from '../../../../actions/home'
import {showSnackbar, hideSnackbar} from '../../../../actions/messageSnackbar';

// Redux
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		postEvents:(lat, lng, title, startTime, endTime, detail, imgSrc, GroupId, UserId)=>{
			dispatch(postEvents(lat, lng, title, startTime, endTime, detail, imgSrc, GroupId, UserId))
			.payload.then((response) => {
				console.log(response);
				if (!response.error) {
					console.log(response.data);
					dispatch(showSnackbar(response.data));
				} else {
					console.log(response.error);
					dispatch(showSnackbar(response.error));
				}
			});
		}
	};
};

const mapStateToProps = (state) => {
	return {
		homeGroupDetails: state.home.homeGroupDetails,
		user: state.user
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
