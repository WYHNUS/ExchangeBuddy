export const TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST = 'TOGGLE_HOME_GROUP_UNIVERSITY_SEARCH_LIST';

export const toggleHomeGroupUniversitySearchList = (open) =>{
	return{
		type: TOGGLE_BOTTOM_BAR_VISIBILITY,
		open
	}
}
