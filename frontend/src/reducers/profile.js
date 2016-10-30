import {
	START_FETCHING_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, RESET_PROFILE,
 	EDIT_PROFILE_SUCCESS
 } from '../actions/profile';

const initialState={
	//user:{user:user,error:null,loading:false},
	//userGroups:{userGroups:userGroups,error:null,loading:false},
	//userHomeUniversity:{userHomeUniversity:userHomeUniversity,error:null,loading:false},
	//userExchangeUniversities:{userExchangeUniversities:userExchangeUniversities,error:null,loading:false},
	userProfile:{userProfile:{}, error:null, loading:false},
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

		default:
		return state
	}
}