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
	const req = request
		.get(ROOT_URL + '/user/' + userId)
		.use(bearer);

	return {
		type: START_FETCHING_PROFILE,
		payload: req
	};
}

export function resetProfile(){
	return{
		type: RESET_PROFILE
	}
}

/************************************************************
UPDATING A PROFILE
************************************************************/
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';


export function editProfileSuccess(profile){
	return {
		type: EDIT_PROFILE_SUCCESS,
		payload: profile
	};
}

export function editProfileFailure(error){
	return {
		type: EDIT_PROFILE_FAILURE,
		payload: error
	};
}

export function editProfile(userId, name, birthday, website, bio, email){
	var profileObj = {
		userId: userId,
		name:name, 
		birthday:birthday, 
		website:website, 
		bio:bio, 
		email:email
	}
	const req = request
		.patch(ROOT_URL + '/updateUser/')
		.send(profileObj)
		.use(bearer);

	return {
		type: EDIT_PROFILE,
		payload: req
	};
}

/************************************************************
UPDATING A UNIVERSITY
************************************************************/
export const EDIT_UNIVERSITIES = 'EDIT_UNIVERSITIES'
export const EDIT_UNIVERSITIES_SUCCESS = 'EDIT_UNIVERSITIES_SUCCESS';
export const EDIT_UNIVERSITIES_FAILURE = 'EDIT_UNIVERSITIES_FAILURE';


export function editUniversitiesSuccess(profile){
	return {
		type: EDIT_UNIVERSITIES_SUCCESS,
		payload: profile
	};
}

export function editUniversitiesFailure(error){
	return {
		type: EDIT_UNIVERSITIES_FAILURE,
		payload: error
	};
}

export function editUniversities(userId, homeUniversityId, exchangeUniversityId=null, term=null, year=null) {
	console.log(userId);
	console.log(homeUniversityId);
	var profileObj = {
		userId: userId,
		homeUniversityId: homeUniversityId,
		exchangeUniversityId: exchangeUniversityId,
		term: term,
		year: year
	}
	const req = request
		.patch(ROOT_URL + '/updateUni/')
		.send(profileObj)
		.use(bearer);

	return {
		type: EDIT_UNIVERSITIES,
		payload: req
	};
}