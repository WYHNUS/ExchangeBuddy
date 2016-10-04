import {TOGGLE_BOTTOM_BAR_VISIBILITY, 
	TOGGLE_TOP_BAR_BACK_BUTTON, 
	TOGGLE_HOME_SEARCH_DRAWER} from '../actions/pageVisibility';

//designing state shape
const initialState = {
	bottomBarVisibility: false,
	topBarBackButtonVisibility: false,
	homeSearchDrawerOpen: false
}

export function pageVisibility(state=initialState, action) {

	switch (action.type) {
		case TOGGLE_BOTTOM_BAR_VISIBILITY:
		return Object.assign({}, state, {
			bottomBarVisibility: action.visibility
		})
		case TOGGLE_TOP_BAR_BACK_BUTTON:
		return Object.assign({}, state, {
			topBarBackButtonVisibility: action.visibility
		})
		case TOGGLE_HOME_SEARCH_DRAWER:
		return Object.assign({}, state, {
			homeSearchDrawerOpen: action.visibility
		})
		default:
		return state
	}
}