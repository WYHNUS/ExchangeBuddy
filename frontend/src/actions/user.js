export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const SAVE_SIGNUP_PAGE_ONE_INFO = 'SAVE_SIGNUP_PAGE_ONE_INFO';
export const SAVE_SIGNUP_PAGE_TWO_INFO = 'SAVE_SIGNUP_PAGE_TWO_INFO';
export const SAVE_SIGNUP_PAGE_THREE_INFO = 'SAVE_SIGNUP_PAGE_THREE_INFO';

export const FIND_UNI_DOMAIN = 'FIND_UNI_DOMAIN';

const ROOT_URL = 'http://localhost:3001';

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

export function saveSignupPageThreeInfo(email) {
	return { type: SAVE_SIGNUP_PAGE_THREE_INFO, field }
}

// export function attemptSubmitSignup(field) {
// 	return (dispatch) => {
// 	    dispatch(clickedLogin());

// 	    request.post(ROOT_URL + '/verificationemail')
// 			.send({
// 				facebookToken: ,
// 				email: ,
// 				name: ,
// 				gender: ,
// 				exchangeYear: ,
// 				exchangeSem: ,
// 				homeUniversity: {
// 					id: ,
// 					name: 
// 				},
// 				exchangeUniversity: {
// 					id: ,
// 					name: 
// 				}
// 			})
// 			.end(function(err,res){
// 				// console.log(res);
// 				// console.log(err);
// 				if(res.body.status === "success"){
// 					dispatch(loginSuccess(res.body.user, res.body.token));
// 				} else {
// 					if (res.status === 404) {
// 						dispatch(requireRegistration({error:res.body.message}));
// 					} else {
// 						dispatch(loginFail({error:res.body.message}));
// 					}
// 				}
// 			});
//   	}
// }