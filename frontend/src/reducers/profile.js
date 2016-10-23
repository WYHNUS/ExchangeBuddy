import {FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, RESET_PROFILE} from '../actions/profile';


const userGroups=
[
{
	name: 'KTH Royal Institute of Technology exchange students -- Spring 2016',
	id: '1',
	groupType: 0
},
{
	name: 'National University of Singapore going abroad -- Spring 2016',
	id: '2',
	groupType: 1
}, 
{
	name: 'National University of Singapore students in KTH Royal Institute of Technology',
	id: '3',
	groupType: 2
},
{
	name: 'NCST Batch 32',
	id: '4',
	groupType: 3
}
];

const userHomeUniversity = {name: 'National University of Singapore'};
const userExchangeUniversities = [{name: 'KTH Royal Institute of Technology'}];
const user = {id:'1', fbUserId:'asflhkjh', displayName: 'Lee Kai Yi' }

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
		case FETCH_PROFILE:
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