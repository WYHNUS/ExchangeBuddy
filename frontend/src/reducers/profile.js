import {
	START_FETCHING_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, RESET_PROFILE,
 	EDIT_PROFILE_SUCCESS,
 	START_FETCHING_PROFILE_GROUPS, FETCH_PROFILE_GROUPS_SUCCESS, 
 	FETCH_PROFILE_GROUPS_FAILURE, RESET_PROFILE_GROUPS,
 } from '../actions/profile';

const initialState={
	//user:{user:user,error:null,loading:false},
	//userGroups:{userGroups:userGroups,error:null,loading:false},
	//userHomeUniversity:{userHomeUniversity:userHomeUniversity,error:null,loading:false},
	//userExchangeUniversities:{userExchangeUniversities:userExchangeUniversities,error:null,loading:false},
	userProfile:{userProfile:{}, error:null, loading:false},
	userProfileGroups:{userProfileGroups:[], error:null, loading:false},
	fetchingAuthUpdate: false,
	serverStatus: false,
	error: null
}

export function profile(state=initialState, action) {

	let error;

	switch (action.type) {
		case START_FETCHING_PROFILE:
		return {...state, userProfile: {userProfile:{}, error: null, loading: true}};
		case FETCH_PROFILE_SUCCESS:
		return {...state, userProfile: {userProfile: action.payload, error: null, loading: false}};
		case FETCH_PROFILE_FAILURE:
		error = action.payload || {message: action.payload};
		return {...state, userProfile: {userProfile: {}, error: error, loading: false}};
		case RESET_PROFILE:
		return {...state, userProfile: {userProfile: {}, error: null, loading: false}};

		case START_FETCHING_PROFILE_GROUPS:
		return {...state, userProfileGroups: {userProfileGroups:{}, error: null, loading: true}};
		case FETCH_PROFILE_GROUPS_SUCCESS:
		return {...state, userProfileGroups: {userProfileGroups: action.payload, error: null, loading: false}};
		case FETCH_PROFILE_GROUPS_FAILURE:
		error = action.payload || {message: action.payload};
		return {...state, userProfileGroups: {userProfileGroups: {}, error: error, loading: false}};
		case RESET_PROFILE_GROUPS:
		return {...state, userProfileGroups: {userProfileGroups: {}, error: null, loading: false}};

		default:
		return state
	}
}