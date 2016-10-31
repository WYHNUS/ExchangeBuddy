import request from 'superagent';
import {ROOT_URL} from '../util/backend';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export const SAVE_SIGNUP_INFO = 'SAVE_SIGNUP_INFO';
export const CLICKED_SIGNUP = 'CLICKED_SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';


//default is visible (true)
export function updateUserProfile(profile) {
	return {
		type: UPDATE_USER_PROFILE,
		profile:profile
	}
}

/*		new signup flow		*/
export function saveSignupInfo(field) {
	return { type: SAVE_SIGNUP_INFO, field }
}

export function clickedSignup() {
    return { type: CLICKED_SIGNUP };
}

export function signupSuccess(msg) {
    return { type: SIGNUP_SUCCESS, msg };
}

export function signupFail(error) {
    return { type: SIGNUP_FAIL, error };
}

export function submitSignupForm(field) {
	// console.log(field);
	return (dispatch) => {
	    dispatch(clickedSignup());

	    request.put(ROOT_URL + '/createUser')
			.send({
				name: field.userName,
				email: field.userEmail,
				password: field.userPassword
			})
			.end(function(err, res){
				console.log(err);
				console.log(res);
				if(res.body.status === "success"){
					dispatch(signupSuccess(res.body.message));
				} else {
					if (res.status === 409 || err.status === 409) {
						// email already registered
						console.log(res.body.message);
						dispatch(signupFail({
							error: res.body.message
						}));
					} else {
						dispatch(signupFail({error:res.body.message}));
					}
				}
			});
  	}
}