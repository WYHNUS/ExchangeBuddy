import request from 'superagent';
import {bearer} from '../util/bearer';
import {ROOT_URL} from '../util/backend';

/************************************************************
FETCHING A PROFILE
************************************************************/

export const START_FETCHING_PROFILE = 'START_FETCHING_PROFILE'
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const RESET_PROFILE = 'RESET_PROFILE';


export function clickedFetching(argument) {
	return { type: START_FETCHING_PROFILE };
}

export function fetchProfileSuccess(profile){
	return {
		type: FETCH_PROFILE_SUCCESS,
		payload: profile
	};
}

export function fetchProfileFailure(error){
	return {
		type: FETCH_PROFILE_FAILURE,
		payload: error
	};
}

export function fetchProfile(userId){
	// return (dispatch) => {
	//     dispatch(clickedFetching());

		var query = request
			.get(ROOT_URL + '/user/' + userId)
			.use(bearer);

		return {
			type: START_FETCHING_PROFILE,
			payload: query
		};
	// }
}

export function resetProfile(){
	return{
		type: RESET_PROFILE
	}
}