import axios from 'axios';

export const TOGGLE_SELECTED_HOME_GROUP = 'TOGGLE_SELECTED_HOME_GROUP';
export const TOGGLE_HOME_TAB = 'TOGGLE_HOME_TAB';

//api for fetching messages
export const FETCH_HOME_MESSAGES = 'FETCH_HOME_MESSAGES';
export const FETCH_HOME_MESSAGES_SUCCESS = 'FETCH_HOME_MESSAGES_SUCCESS';
export const FETCH_HOME_MESSAGES_FAILURE = 'FETCH_HOME_MESSAGES_FAILURE';
export const RESET_HOME_MESSAGES = 'RESET_HOME_MESSAGES';

import {ROOT_URL} from '../util/backend';

/************************************************************
FETCHING EVENTS OF A GROUP
************************************************************/

export const FETCH_MY_GROUPS = 'FETCH_MY_GROUPS';
export const FETCH_MY_GROUPS_SUCCESS = 'FETCH_MY_GROUPS_SUCCESS';
export const FETCH_MY_GROUPS_FAILURE = 'FETCH_MY_GROUPS_FAILURE';
export const RESET_MY_GROUPS = 'RESET_MY_GROUPS';

export function fetchMyGroups(userId){

	const req = axios.post(`${ROOT_URL}/group`, 
	{
		userId: userId
	})
	return {
		type: FETCH_MY_GROUPS,
		payload: req
	};

}

export function fetchMyGroupsSuccess(groups){
	console.log(groups);
	return {
		type: FETCH_MY_GROUPS_SUCCESS,
		payload: groups
	};
}

export function fetchMyGroupsFailure(error){
	//console.log(error);
	return {
		type: FETCH_MY_GROUPS_FAILURE,
		payload: error
	};
}

export function resetMyGroups(){
	return{
		type: RESET_MY_GROUPS
	}
}


//export function fetchMyGroups()

/************************************************************
FETCHING EVENTS OF A GROUP
************************************************************/

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const RESET_EVENTS = 'RESET_EVENTS';

export function fetchEvents(GroupId){

	const req = axios.post(`${ROOT_URL}/allEvents`, 
	{
		GroupId: GroupId
	})
	return {
		type: FETCH_EVENTS,
		payload: req
	};

}

export function fetchEventsSuccess(events){
	//console.log(events);
	return {
		type: FETCH_EVENTS_SUCCESS,
		payload: events
	};
}

export function fetchEventsFailure(error){
	//console.log(error);
	return {
		type: FETCH_EVENTS_FAILURE,
		payload: error
	};
}

export function resetEvents(){
	return{
		type: RESET_EVENTS
	}
}

/************************************************************
POSTING EVENTS TO A GROUP
************************************************************/

export const POST_EVENTS = 'POST_EVENTS';
export const POST_EVENTS_SUCCESS = 'POST_EVENTS_SUCCESS';
export const POST_EVENTS_FAILURE = 'POST_EVENTS_FAILURE';

export function postEvents(lat, lng, title, startTime, endTime, detail, imgSrc, GroupId, UserId){

	const req = axios.put(`${ROOT_URL}/events`, 
	{
		lat: lat,
		lng: lng,
		title: title,
		startTime: startTime,
		endTime: endTime,
		detail: detail,
		imgSrc: imgSrc,
		GroupId: GroupId,
		UserId: UserId
	})
	return {
		type: POST_EVENTS,
		payload: req
	};

}

export function postEventsSuccess(events){
	console.log(events);
	return {
		type: POST_EVENTS_SUCCESS,
		payload: events
	};
}

export function postEventsFailure(error){
	//console.log(error);
	return {
		type: POST_EVENTS_FAILURE,
		payload: error
	};
}

/************************************************************
FETCHING HOME MESSAGES OF A GROUP
************************************************************/


export function fetchHomeMessages(groupId) {
	const request = axios({
		method: 'get',
		url: `${ROOT_URL}/home/messages${groupId}`,
		headers: []
	});

	return {
		type: FETCH_HOME_MESSAGES,
		payload: request
	};
}

export function fetchHomeMessagesSuccess(messages) {
	return {
		type: FETCH_HOME_MESSAGES_SUCCESS,
		payload: messages
	};
}

export function fetchHomeMessagesError(error) {
	return {
		type: FETCH_HOME_MESSAGES_FAILURE,
		payload: error
	};
}

export function resetHomeMessages(){
	return{
		type: RESET_HOME_MESSAGES
	}
}


/************************************************************
TOGGLING BETWEEN GROUPS
************************************************************/

export function toggleSelectedHomeGroup(index){
	return{
		type: TOGGLE_SELECTED_HOME_GROUP,
		index
	}
}

/************************************************************
TOGGLING HOME TAB
************************************************************/
export function toggleHomeTab(tabValue){
	return{
		type: TOGGLE_HOME_TAB,
		tabValue
	}
}
