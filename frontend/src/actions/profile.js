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
FETCHING ALL GROUPS OF USER PROFILE
************************************************************/

export const START_FETCHING_PROFILE_GROUPS = 'START_FETCHING_PROFILE_GROUPS';
export const FETCH_PROFILE_GROUPS_SUCCESS = 'FETCH_PROFILE_GROUPS_SUCCESS';
export const FETCH_PROFILE_GROUPS_FAILURE = 'FETCH_PROFILE_GROUPS_FAILURE';
export const RESET_PROFILE_GROUPS = 'RESET_PROFILE_GROUPS';

export function fetchProfileGroups(userId){
	const req = request
		.post(ROOT_URL + '/group')
		.send({ userId: userId })
		.use(bearer);

	return {
		type: START_FETCHING_PROFILE_GROUPS,
		payload: req
	};

}

export function fetchProfileGroupsSuccess(groups){
	return {
		type: FETCH_PROFILE_GROUPS_SUCCESS,
		payload: groups
	};
}

export function fetchProfileGroupsFailure(error){
	return {
		type: FETCH_PROFILE_GROUPS_FAILURE,
		payload: error
	};
}

export function resetProfileGroups(){
	return{
		type: RESET_PROFILE_GROUPS
	}
}

/************************************************************
UPDATING A PROFILE
************************************************************/
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';


export function editProfile(userName, userPassword){
	var obj = {
	    bio: null,
	    website: null,
	    birthday: null,
		name: userName,
		password: userPassword
	};
	console.log('edit profile obg', obj);
	const req = request
		.patch(ROOT_URL + '/updateUser')
		.send(obj)
		.use(bearer);

	return {
		type: EDIT_PROFILE,
		payload: req
	};
}

export function editProfileSuccess(profile){
	return {
		type: EDIT_PROFILE_SUCCESS,
		profile: profile
	};
}


/************************************************************
UPDATING A UNIVERSITY
************************************************************/
export const EDIT_UNIVERSITIES = 'EDIT_UNIVERSITIES';
export const EDIT_UNIVERSITIES_SUCCESS = 'EDIT_UNIVERSITIES_SUCCESS';
export const EDIT_UNIVERSITIES_FAILURE = 'EDIT_UNIVERSITIES_FAILURE';


export function editUniversitiesSuccess(user){
	return {
		type: EDIT_UNIVERSITIES_SUCCESS,
		user: user
	};
}

export function editUniversitiesFailure(error){
	return {
		type: EDIT_UNIVERSITIES_FAILURE,
		error: error
	};
}

export function editUniversities(userId, homeUniversityId, exchangeUniversityId=null, year=null, term=null) {
	var profileObj = {
		userId: userId,
		homeUniversityId: homeUniversityId,
		exchangeUniversityId: exchangeUniversityId,
		term: term,
		year: year
	};
	const req = request
		.patch(ROOT_URL + '/updateUni')
		.send(profileObj)
		.use(bearer);

	return {
		type: EDIT_UNIVERSITIES,
		payload: req
	};
}