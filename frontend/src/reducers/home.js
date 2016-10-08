import {TOGGLE_HOME_COUNTRY,FETCH_HOME_MESSAGES,FETCH_HOME_MESSAGES_SUCCESS,
FETCH_HOME_MESSAGES_FAILURE,RESET_HOME_MESSAGES} from '../actions/home';

const initialState={
	homeCountry: 
	{
		id:1
	},
	homeEvents:{homeEvents:[],error:null,loading:false},
	homeMessages:{homeMessages:[],error:null,loading:false},
	homeFriends:{homeFriends:[],error:null,loading:false}
}


export function home(state=initialState, action) {

	let error;
	
	switch (action.type) {
		
		case TOGGLE_HOME_COUNTRY:
		return {...state, homeCountry: {id:action.id}}
		
		case FETCH_HOME_MESSAGES:
		return {...state, homeMessages: {homeMessages:[], error: null, loading: true}};
		case FETCH_HOME_MESSAGES_SUCCESS:
		return {...state, homeMessages: {homeMessages: action.payload.data, error:null, loading: false}};
		case FETCH_HOME_MESSAGES_FAILURE:
		error = action.payload.data || {message: action.payload.message};
		return {...state, homeMessages: {homeMessages: [], error: error, loading: false}};
		case RESET_HOME_MESSAGES:
		return {...state, homeMessages: {homeMessages: [], error:null, loading: false}}


		default:
		return state
	}
}