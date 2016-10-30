import {START_FETCHING_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, RESET_PROFILE
, EDIT_UNIVERSITIES, EDIT_UNIVERSITIES_SUCCESS, EDIT_UNIVERSITIES_FAILURE,
EDIT_PROFILE, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE} from '../actions/profile';

const initialState={
	//user:{user:user,error:null,loading:false},
	//userGroups:{userGroups:userGroups,error:null,loading:false},
	//userHomeUniversity:{userHomeUniversity:userHomeUniversity,error:null,loading:false},
	//userExchangeUniversities:{userExchangeUniversities:userExchangeUniversities,error:null,loading:false},
	userProfile:{userProfile:{}, error:null, loading:false}
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

		case EDIT_UNIVERSITIES_SUCCESS:
		return {...state}

		default:
		return state
	}
}