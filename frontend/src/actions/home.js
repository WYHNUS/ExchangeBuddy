export const TOGGLE_HOME_COUNTRY = 'TOGGLE_HOME_COUNTRY'; 

//api for fetching messages
export const FETCH_HOME_MESSAGES = 'FETCH_HOME_MESSAGES';
export const FETCH_HOME_MESSAGES_SUCCESS = 'FETCH_HOME_MESSAGES_SUCCESS';
export const FETCH_HOME_MESSAGES_FAILURE = 'FETCH_HOME_MESSAGES_FAILURE';
export const RESET_HOME_MESSAGES = 'RESET_HOME_MESSAGES';

const ROOT_URL = 'https://exchangebuddy.com';

export function toggleHomeCountry(id){
	return{
		type: TOGGLE_HOME_COUNTRY,
		id
	}
}

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
		payload: posts
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