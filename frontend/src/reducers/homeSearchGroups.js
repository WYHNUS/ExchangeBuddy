import {TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST} from '../actions/homeSearchGroups';

const initialState={
	homeGroupUniversitySearchListOpen: false
}

export function homeSearchGroups(state=initialState, action) {

	switch (action.type) {
		case TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST:
		return Object.assign({}, state, {
			homeGroupUniversitySearchListOpen: action.open
		})
		default:
		return state
	}
}