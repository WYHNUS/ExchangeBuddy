import axios from 'axios';

//api for fetching messages
export const FETCH_ALL_UNIVERSITIES = 'FETCH_ALL_UNIVERSITIES';
export const FETCH_All_UNIVERSITIES_SUCCESS = 'FETCH_All_UNIVERSITIES_SUCCESS';
export const FETCH_All_UNIVERSITIES_FAILURE = 'FETCH_All_UNIVERSITIES_FAILURE';
export const RESET_All_UNIVERSITIES = 'RESET_All_UNIVERSITIES';


const ROOT_URL = 'http://localhost:3001';

export function fetchAllUniversities() {
	const request = axios({
		method: 'get',
		url: `${ROOT_URL}/university`,
		headers: []
	});

	return {
		type: FETCH_ALL_UNIVERSITIES,
		payload: request
	};
}

export function fetchAllUniversitiesSuccess(unis){
	return {
		type: FETCH_All_UNIVERSITIES_SUCCESS,
		payload: unis
	};
}

export function fetchAllUniversitiesFailure(error){
	return {
		type: FETCH_All_UNIVERSITIES_FAILURE,
		payload: error
	};
}

export function resetAllUniversities(){
	return{
		type: RESET_All_UNIVERSITIES
	}
}