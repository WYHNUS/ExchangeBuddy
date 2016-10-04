import {TOGGLE_HOME_COUNTRY} from '../actions/home';

//state - current group
//

const initialState={
	homeCountry: 
	{
		id:1
	},
	homeEvents:[],
	homeChat:[],
	homeFriends:[]
}


export function home(state=initialState, action) {

	switch (action.type) {
		case TOGGLE_HOME_COUNTRY:
		return Object.assign({}, state, {
			homeCountry: action.id
		})
		default:
		return state
	}
}