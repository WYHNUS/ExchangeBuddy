export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

//default is visible (true)
export function updateUserProfile(profile){
	return{
		type: UPDATE_USER_PROFILE,
		profile:profile
	}
}