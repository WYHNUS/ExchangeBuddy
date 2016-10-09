import {TOGGLE_HOME_COUNTRY,FETCH_HOME_MESSAGES,FETCH_HOME_MESSAGES_SUCCESS,
FETCH_HOME_MESSAGES_FAILURE,RESET_HOME_MESSAGES,
FETCH_FB_EVENTS, FETCH_FB_EVENTS_SUCCESS,
FETCH_FB_EVENTS_FAILURE, RESET_FB_EVENTS} from '../actions/home';

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
			return {...state, homeMessages: {homeMessages: action.payload, error:null, loading: false}};
		case FETCH_HOME_MESSAGES_FAILURE:
			error = action.payload || {message: action.payload};
			return {...state, homeMessages: {homeMessages: [], error: error, loading: false}};
		case RESET_HOME_MESSAGES:
			return {...state, homeMessages: {homeMessages: [], error:null, loading: false}}

		case FETCH_FB_EVENTS:
			return {...state, homeEvents: {homeEvents:[], error: null, loading: true}};
		case FETCH_FB_EVENTS_SUCCESS:
			return {...state, homeEvents: {homeEvents: action.payload, error:null, loading: false}};
		case FETCH_FB_EVENTS_FAILURE:
			error = action.payload || {message: action.payload};
			return {...state, homeEvents: {homeEvents: [], error: error, loading: false}};
		case RESET_FB_EVENTS:
			return {...state, homeEvents: {homeEvents: [], error:null, loading: false}}

		default:
			return state
	}
}