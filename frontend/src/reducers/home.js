import {TOGGLE_SELECTED_HOME_GROUP,FETCH_HOME_MESSAGES,FETCH_HOME_MESSAGES_SUCCESS,
	FETCH_HOME_MESSAGES_FAILURE,RESET_HOME_MESSAGES,
	FETCH_FB_EVENTS, FETCH_FB_EVENTS_SUCCESS,
	FETCH_FB_EVENTS_FAILURE, RESET_FB_EVENTS} from '../actions/home';

	const homeGroups=
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
	const homeGroupDetails=
	{
		id:'1',
		name: 'KTH Royal Institute of Technology exchange students -- Spring 2016',
		groupType:0
	};
	const homeMessages=
	[
	];
	const homeFriends=
	[
	{
		id: '1',
		displayName: 'Lee Kai Yi',
		homeUniversity:
		{
			name: 'National University of Singapore'
		}

	},
	{
		id: '2',
		displayName: 'Eugene Ng',
		homeUniversity:
		{
			name: 'National University of Singapore'
		}

	},
	{
		id: '3',
		displayName: 'Wang Yanhao',
		homeUniversity:
		{
			name: 'National University of Singapore'
		}

	},
	{
		id: '4',
		displayName: 'Zhang Hanming',
		homeUniversity:
		{
			name: 'National University of Singapore'
		}

	}
	]

	const initialState={
		homeGroups:{selected:0,homeGroups:homeGroups,error:null,loading:false},
		homeGroupDetails:{homeGroupDetails:homeGroupDetails,error:null,loading:false},
		homeEvents:{homeEvents:[],error:null,loading:false},
		homeMessages:{homeMessages:[],error:null,loading:false},
		homeFriends:{homeFriends:homeFriends,error:null,loading:false}
	}


	export function home(state=initialState, action) {

		let error;

		switch (action.type) {

			case TOGGLE_SELECTED_HOME_GROUP:
			return {...state, 
				homeGroups: {...state.homeGroups,selected:action.index},
				homeGroupDetails:{...state.homeGroupDetails, homeGroupDetails:state.homeGroups.homeGroups[action.index]}}

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