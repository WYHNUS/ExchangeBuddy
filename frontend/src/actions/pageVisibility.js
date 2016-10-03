export const TOGGLE_BOTTOM_BAR_VISIBILITY = 'TOGGLE_BOTTOM_BAR_VISIBILITY';
export const TOGGLE_TOP_BAR_BACK_BUTTON = 'TOGGLE_TOP_BAR_BACK_BUTTON';

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
