export const TOGGLE_BOTTOM_BAR_VISIBILITY = 'TOGGLE_BOTTOM_BAR_VISIBILITY';
export const TOGGLE_TOP_BAR_BACK_BUTTON = 'TOGGLE_TOP_BAR_BACK_BUTTON';
export const TOGGLE_HOME_SEARCH_DRAWER = 'TOGGLE_HOME_SEARCH_DRAWER';

//default is visible (true)
export function toggleBottomBarVisibility(visibility){
	return{
		type: TOGGLE_BOTTOM_BAR_VISIBILITY,
		visibility
	}
}

//default is invisible (false)
export function toggleTopBarBackButtonVisibility(visibility){
	return{
		type: TOGGLE_TOP_BAR_BACK_BUTTON,
		visibility
	}
}

//default is invisible (false)
export function toggleHomeSearchDrawerVisibility(visibility){
	return{
		type: TOGGLE_HOME_SEARCH_DRAWER,
		visibility
	}
}
