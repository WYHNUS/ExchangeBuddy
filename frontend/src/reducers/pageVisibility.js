import {TOGGLE_BOTTOM_BAR_VISIBILITY, TOGGLE_TOP_BAR_BACK_BUTTON} from '../actions/pageVisibility';

//designing state shape
const initialState = {
	bottomBarVisibility: false,
	topBarBackButtonVisibility: false
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
		default:
		return state
	}
}