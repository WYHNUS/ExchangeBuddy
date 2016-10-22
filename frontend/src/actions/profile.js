import axios from 'axios';
import {ROOT_URL} from '../util/backend';

/************************************************************
FETCHING A PROFILE
************************************************************/

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';
export const RESET_PROFILE = 'RESET_PROFILE';

export function fetchProfile(userId){

	const req = axios.get(`${ROOT_URL}/user/${userId}`)
	return {
		type: FETCH_PROFILE,
		payload: req
	};

}

export function fetchProfileSuccess(profile){
	console.log(profile);
	return {
		type: FETCH_PROFILE_SUCCESS,
		payload: profile
	};
}

export function fetchProfileFailure(error){
	//console.log(error);
	return {
		type: FETCH_PROFILE_FAILURE,
		payload: error
	};
}

export function resetProfile(){
	return{
		type: RESET_PROFILE
	}
}