export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const SAVE_SIGNUP_PAGE_ONE_INFO = 'SAVE_SIGNUP_PAGE_ONE_INFO';
export const SAVE_SIGNUP_PAGE_TWO_INFO = 'SAVE_SIGNUP_PAGE_TWO_INFO';

//default is visible (true)
export function updateUserProfile(profile) {
	return {
		type: UPDATE_USER_PROFILE,
		profile:profile
	}
}

export function saveSignupPageOneInfo(field) {
	return { type: SAVE_SIGNUP_PAGE_ONE_INFO, field }
}

export function saveSignupPageTwoInfo(field) {
	return { type: SAVE_SIGNUP_PAGE_TWO_INFO, field }
}