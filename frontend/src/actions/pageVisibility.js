export const TOGGLE_BOTTOM_BAR_VISIBILITY = 'TOGGLE_BOTTOM_BAR_VISIBILITY';
export const TOGGLE_TOP_BAR_BACK_BUTTON = 'TOGGLE_TOP_BAR_BACK_BUTTON';
export const TOGGLE_TOP_BAR_SETTINGS_BUTTON = 'TOGGLE_TOP_BAR_SETTINGS_BUTTON';
export const TOGGLE_HOME_SEARCH_DRAWER = 'TOGGLE_HOME_SEARCH_DRAWER';
export const TOGGLE_HOME_SEARCH_DRAWER_BUTTON_VISIBILITY = 'TOGGLE_HOME_SEARCH_DRAWER_BUTTON_VISIBILITY';
export const TOGGLE_TOP_BAR_VISIBILITY = 'TOGGLE_TOP_BAR_VISIBILITY';

export const TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST = 'TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST';

export const toggleHomeGroupUniversitySearchList = (open) =>{
	return{
		type: TOGGLE_BOTTOM_BAR_VISIBILITY,
		open
	}
}

export function toggleTopBarVisibility(visibility){
	return{
		type:TOGGLE_TOP_BAR_VISIBILITY,
		visibility
	}
}


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

export function toggleTopBarSettingsButtonVisibility(visibility){
	return{
		type:TOGGLE_TOP_BAR_SETTINGS_BUTTON,
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
 export function toggleHomeSearchDrawerOpenButtonVisibility(visibility){
 	return{
 		type: TOGGLE_HOME_SEARCH_DRAWER_BUTTON_VISIBILITY,
 		visibility
 	}
 }