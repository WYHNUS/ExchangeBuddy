export const TOGGLE_SELECTED_HOME_GROUP = 'TOGGLE_SELECTED_HOME_GROUP';
export const TOGGLE_HOME_TAB = 'TOGGLE_HOME_TAB';

//api for fetching fb events
export const FETCH_FB_EVENTS = 'FETCH_FB_EVENTS';
export const FETCH_FB_EVENTS_SUCCESS = 'FETCH_FB_EVENTS_SUCCESS';
export const FETCH_FB_EVENTS_FAILURE = 'FETCH_FB_EVENTS_FAILURE';
export const RESET_FB_EVENTS = 'RESET_FB_EVENTS';

//api for fetching meetup events
export const FETCH_MU_EVENTS = 'FETCH_MU_EVENTS';
export const FETCH_MU_EVENTS_SUCCESS = 'FETCH_MU_EVENTS_SUCCESS';
export const FETCH_MU_EVENTS_FAILURE = 'FETCH_MU_EVENTS_FAILURE';
export const RESET_MU_EVENTS = 'RESET_MU_EVENTS';

//api for fetching messages
export const FETCH_HOME_MESSAGES = 'FETCH_HOME_MESSAGES';
export const FETCH_HOME_MESSAGES_SUCCESS = 'FETCH_HOME_MESSAGES_SUCCESS';
export const FETCH_HOME_MESSAGES_FAILURE = 'FETCH_HOME_MESSAGES_FAILURE';
export const RESET_HOME_MESSAGES = 'RESET_HOME_MESSAGES';

const ROOT_URL = 'https://exchangebuddy.com';
//import EventSearch from "facebook-events-by-location-core";	

/************************************************************
FETCHING FB EVENTS OF A GROUP
************************************************************/


export function fetchFbEvents(countryCode, uniLatLng){
	/*var es = new EventSearch({
		lat: 40.710803,
		lng: -73.964040,
		accessToken: '	',
          // distance in metres
        distance: 50000
	});

	var req = es.search();*/

	var req='miao';

	return {
		type: FETCH_FB_EVENTS,
		payload: req
	};

}

export function fetchFbEventsSuccess(events){
	console.log(events);
	return {
		type: FETCH_FB_EVENTS_SUCCESS,
		payload: events
	};
}

export function fetchFbEventsFailure(error){
	console.log(error);
	return {
		type: FETCH_FB_EVENTS_FAILURE,
		payload: error
	};
}

export function resetFbEvents(){
	return{
		type: RESET_FB_EVENTS
	}
}


/************************************************************
FETCHING MU EVENTS OF A GROUP
************************************************************/

export function fetchMuEvents(){

}

export function fetchMuEventsSuccess(events){
	
}

export function fetchMuEventsFailure(error){

}

export function resetMuEvents(){

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
