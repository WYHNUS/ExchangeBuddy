import {TOGGLE_BOTTOM_BAR_VISIBILITY, 
	TOGGLE_TOP_BAR_BACK_BUTTON,
	TOGGLE_TOP_BAR_SETTINGS_BUTTON, 
	TOGGLE_HOME_SEARCH_DRAWER,
TOGGLE_HOME_SEARCH_DRAWER_BUTTON_VISIBILITY,
TOGGLE_TOP_BAR_VISIBILITY} from '../actions/pageVisibility';

//designing state shape
const initialState = {
	bottomBarVisibility: false,
	topBarBackButtonVisibility: false,
	homeSearchDrawerOpen: false,
	homeSearchDrawerOpenButtonVisibility: false,
	topBarVisibility:false,
	topBarSettingsButton:false
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
		case TOGGLE_HOME_SEARCH_DRAWER_BUTTON_VISIBILITY:
		return Object.assign({}, state, {
			homeSearchDrawerOpenButtonVisibility: action.visibility
		})
		case TOGGLE_TOP_BAR_VISIBILITY:
		return Object.assign({}, state,{
			topBarVisibility:action.visibility
		})
		case TOGGLE_TOP_BAR_SETTINGS_BUTTON:
		return Object.assign({}, state,{
			topBarSettingsButton:action.visibility
		})
		default:
		return state
	}
}

/*export function switchGroupDialogOpen(state = "", action) {
  switch (action.type) {
    case 'SET_SWITCH_GROUP_DIALOG_OPEN':
      return action.open || false;
    default:
      return state;
  }
}
*/