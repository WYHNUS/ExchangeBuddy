import {
	TOGGLE_SELECTED_HOME_GROUP, TOGGLE_HOME_TAB,
	FETCH_HOME_MESSAGES,FETCH_HOME_MESSAGES_SUCCESS,
	FETCH_HOME_MESSAGES_FAILURE,RESET_HOME_MESSAGES, 
	FETCH_EVENTS, FETCH_EVENTS_SUCCESS, 
	FETCH_EVENTS_FAILURE, RESET_EVENTS,
	FETCH_MY_GROUPS, FETCH_MY_GROUPS_SUCCESS,
	FETCH_MY_GROUPS_FAILURE, RESET_MY_GROUPS,
	FETCH_CURRENT_GROUP, FETCH_CURRENT_GROUP_SUCCESS,
	FETCH_CURRENT_GROUP_FAILURE, RESET_CURRENT_GROUP,
	FETCH_GROUP_MESSAGES, FETCH_GROUP_MESSAGES_SUCCESS,
	FETCH_GROUP_MESSAGES_FAILURE, RESET_GROUP_MESSAGES,
	UPDATE_GROUP_MESSAGE_FROM_SOCKET,
	GO_FOR_AN_EVENT_SUCCESS_UPDATE} from '../actions/home';

	/*const homeGroups=
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
	];*/
	/*const homeGroupDetails=
	{
		id:'1',
		name: 'KTH Royal Institute of Technology exchange students -- Spring 2016',
		groupType:0
	};


{
  "id": 1,
  "name": "a students in a",
  "user": [
    {
      "id": 5,
      "name": "Lee Kai Yi",
      "profilePictureUrl": null,
      "University": {
        "name": "a",
        "id": 3
      },
      "chat_group": {
        "createdAt": "2016-10-17T17:00:11.000Z",
        "updatedAt": "2016-10-17T17:00:11.000Z",
        "groupId": 1,
        "userId": 5
      }
    }
  ],
  "ChatMessages": []
}
*/
	/*const homeFriends=
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
	]*/

	const imgUrl = '../res/Exchange-In-Singapore.jpg';
	const defaultUrl = '../res/user.png';

	/*const homeEvents=
	[
	{
		id:1,
		name: 'Late night chillaxing at my room :)',
		detail: 'Bring stuff to chillax with, dun be shy, \
		just a chill time to come down and have some fun!',
		imgSrc: imgUrl,
		lat:1.2910621,
		lng:103.7761863,
		startTime:'2016-04-23T18:25:43.511Z',
		endTime:'2016-04-23T20:25:43.511Z',
		user:{
			name:'Lee Kai Yi',
			profilePictureUrl:defaultUrl,
			id:1
		},
		group:{}
	},
	{
		id:2,
		name: 'Security Wednesdays #14 - Security Challenges Faced in IoT',
		detail: 'This talk will discuss the general challenges faced in IoT including \
		a case study on how we managed to take over a few hundred IoT gateways. We \
		will also discuss on why developers have difficulty implementing IoT solutions in a secure \
		manner, what the common mistakes are and what some key pointers are to prevent them.',
		imgSrc: null,
		lat:1.29874,
		lng:103.77329,
		startTime:'2016-07-23T18:25:43.511Z',
		endTime:'2016-07-23T20:25:43.511Z',
		user:{
			name:'Lee Kai Yi',
			profilePictureUrl:defaultUrl,
			id:1
		},
		group:{}
	}
	]*/

	

	/*const homeMessages=
	[
	{//user or eventFB or eventMU
		type: 'user', 
		user: {
			userId: 12341,
			displayName: 'Lee Kai Yi',
			userAvatarUrl: defaultUrl
		},
		content: 'hello, this is the first msg',
		createdAt: '2016-07-23T18:25:43.511Z'
	},
	{//user or event
		type: 'eventFB', 
		user: {
			userId: 12342,
			displayName: 'Yanhao',
			userAvatarUrl: defaultUrl
		},
		content: 'hello, this is the first event',
		createdAt: '2016-07-23T18:25:43.511Z',
		eventPosting:{
			id: 1234123,
			url: 'http://meetup.com',
			yes_rsvp_count: 4,
			name: 'cat event',
			profilePicture: '',
			coverPicture: '',
			startTime: '2016-07-23T18:25:43.511Z'
		}
	},
	{//user or event
		type: 'user', 
		user: {
			userId: 123413,
			displayName: 'Hanming',
			userAvatarUrl: defaultUrl
		},
		content: 'hello, this is the second msg',
		createdAt: '2016-07-23T18:25:43.511Z'
	}
	]*/


	const initialState={
		//selectedGroup:{index:-1,groupId:-1},
		homeGroups:{selected:-1,homeGroups:[],error:null,loading:false},
		homeGroupDetails:{detailsLoaded:false,homeGroupDetails:{},error:null,loading:false},
		homeEvents:{homeEvents:[],error:null,loading:false},
		homeMessages:{homeMessages:[],error:null,loading:false},
		homeFriends:{homeFriends:[],error:null,loading:false},
		homeTabValue:'events'
	}


	export function home(state=initialState, action) {

		let error;

		switch (action.type) {
			case TOGGLE_HOME_TAB:
			return {...state, homeTabValue:action.tabValue}

			case TOGGLE_SELECTED_HOME_GROUP:
			return {...state, 
				homeGroups: {...state.homeGroups,selected:action.index}}
			/*return {...state, 
				homeGroups: {...state.homeGroups,selected:action.index},
				homeGroupDetails:{...state.homeGroupDetails, homeGroupDetails:state.homeGroups.homeGroups[action.index]}}*/


				case FETCH_HOME_MESSAGES:
				return {...state, homeMessages: {homeMessages:[], error: null, loading: true}};
				case FETCH_HOME_MESSAGES_SUCCESS:
				return {...state, homeMessages: {homeMessages: action.payload, error:null, loading: false}};
				case FETCH_HOME_MESSAGES_FAILURE:
				error = action.payload || {message: action.payload};
				return {...state, homeMessages: {homeMessages: [], error: error, loading: false}};
				case RESET_HOME_MESSAGES:
				return {...state, homeMessages: {homeMessages: [], error:null, loading: false}}

				case FETCH_EVENTS:
				return {...state, homeEvents: {homeEvents:[], error: null, loading: true}};
				case FETCH_EVENTS_SUCCESS:
				return {...state, homeEvents: {homeEvents: action.payload, error: null, loading: false}};
				case FETCH_EVENTS_FAILURE:
				error = action.payload || {message: action.payload};
				return {...state, homeEvents: {homeEvents: [], error: error, loading: false}};
				case RESET_EVENTS:
				return {...state, homeEvents: {homeEvents: [], error: null, loading: false}};

				case FETCH_MY_GROUPS:
				return {...state, homeGroups: {selected:-1, homeGroups:[], error: null, loading: true}};
				case FETCH_MY_GROUPS_SUCCESS:
				return {...state, homeGroups: {selected:0, homeGroups: action.payload, error: null, loading: false}};
				case FETCH_MY_GROUPS_FAILURE:
				error = action.payload || {message: action.payload};
				return {...state, homeGroups: {selected:-1, homeGroups: [], error: error, loading: false}};
				case RESET_MY_GROUPS:
				return {...state, homeGroups: {selected:-1, homeGroups: [], error: null, loading: false}};

				case FETCH_CURRENT_GROUP:
				return {...state, homeGroupDetails: {...state.homeGroupDetails, error: null, loading: true, detailsLoaded:false},
				homeFriends: {homeFriends:[], error: null, loading: true}};
				case FETCH_CURRENT_GROUP_SUCCESS:
				return {...state, homeGroupDetails: {homeGroupDetails: action.payload, error: null, loading: false, detailsLoaded:true},
				homeFriends: {homeFriends: action.payload.user, error: null, loading: false}};
				case FETCH_CURRENT_GROUP_FAILURE:
				error = action.payload || {message: action.payload};
				return {...state, homeGroupDetails: {homeGroupDetails: {}, error: error, loading: false, detailsLoaded:false},
				homeFriends: {homeFriends: [], error: error, loading: false}};
				case RESET_CURRENT_GROUP:
				return {...state, homeGroupDetails: {homeGroupDetails: {}, error: null, loading: false, detailsLoaded:false},
				homeFriends: {homeFriends: [], error: null, loading: false}};

				case FETCH_GROUP_MESSAGES:
				return {...state, homeMessages: { homeMessages:[], error: null, loading: true}};
				case FETCH_GROUP_MESSAGES_SUCCESS:
				return {...state, homeMessages: { homeMessages: action.payload, error: null, loading: false}};
				case FETCH_GROUP_MESSAGES_FAILURE:
				error = action.payload || {message: action.payload};
				return {...state, homeMessages: { homeMessages: [], error: error, loading: false}};
				case RESET_GROUP_MESSAGES:
				return {...state, homeMessages: { homeMessages: [], error: null, loading: false}};
				case UPDATE_GROUP_MESSAGE_FROM_SOCKET:
				return {...state, homeMessages: { homeMessages: state.homeMessages.homeMessages.concat([action.payload]), error: null, loading: false}};

				case GO_FOR_AN_EVENT_SUCCESS_UPDATE:
				return {...state}

				default:
				return state
			}
		}