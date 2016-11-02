/*import {TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST} from '../actions/homeSearchGroups';*/
import {FETCH_ALL_GROUPS,FETCH_ALL_GROUPS_SUCCESS,
FETCH_ALL_GROUPS_FAILURE, RESET_ALL_GROUPS} from '../actions/home';

const initialState={
	homeGroupUniversitySearchListOpen: false,
	allGroups: {allGroups: [],error: null,loading: false}
}

export function homeSearchGroups(state=initialState, action) {

	switch (action.type) {
			/*case TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST:
			return Object.assign({}, state, {
				homeGroupUniversitySearchListOpen: action.open
			})*/

		case FETCH_ALL_GROUPS:
		return {...state, allGroups: {allGroups:[], error: null, loading: true}};
		case FETCH_ALL_GROUPS_SUCCESS:
		return {...state, allGroups: {allGroups: action.payload, error:null, loading: false}};
		case FETCH_ALL_GROUPS_FAILURE:
		error = action.payload || {message: action.payload};
		return {...state, allGroups: {allGroups: [], error: error, loading: false}};
		case RESET_ALL_GROUPS:
		return {...state, allGroups: {allGroups: [], error:null, loading: false}};

		default:
		return state
	}
}