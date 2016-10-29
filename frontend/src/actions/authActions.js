import request from 'superagent';
import cookie from 'react-cookie';

/*
 * action types
 */
export const Clicked_Login = 'Clicked_Login';
export const Login_Success = 'Login_Success';
export const Login_Fail = 'Login_Fail';

export const Not_Authenticated = 'Not_Authenticated';

export const Clicked_Logout = 'Clicked_Logout';
export const Logout_Success = 'Logout_Success';

export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_FAIL = 'VERIFY_TOKEN_FAIL';

// Note: Considered creating a new actions file for navigation
//              related actions. For now, will leave these here.
export const Navigate_Away_From_Auth_Form = 'Navigate_Away_From_Auth_Form';

export const CLEAR_USER = 'CLEAR_USER';

import { ROOT_URL } from '../util/backend';

/*
 * action creators
 */

/*    verification of token received via email    */
export function verifyTokenSuccess(user) {
  return { type: VERIFY_TOKEN_SUCCESS, user };
}
export function verifyTokenFail(error) {
  return { type: VERIFY_TOKEN_FAIL, error };
}
export function verifyToken(token) {
  return (dispatch) => {
    request
      .get(ROOT_URL + '/verify/' + token)
      .end(function(err,res){
        console.log(res);
        console.log(err);
        if(res.body.status === "success"){
          dispatch(verifyTokenSuccess(res.body.user));
        } else {
          dispatch(verifyTokenFail(res.body.message));
        }
      })
  }
}


/*  login attempt */
export function clickedLogin() {
    return { type: Clicked_Login };
}
export function loginSuccess(userObject, token) {
    return { type: Login_Success, userObject, token };
}
export function loginFail(error) {
    return { type: Login_Fail, error };
}
export function requireAuthentication(user, error) {
    return { type: Not_Authenticated, user, error };
}
export function attemptLogin(field) {
  console.log(field);
  return (dispatch) => {
    dispatch(clickedLogin());
    request
      .post(ROOT_URL + '/authenticateByEmail')
      .send({ 
        email: field.userEmail,
        password: field.userPassword
      })
      .end(function(err,res){
        console.log(res);
        console.log(err);
        if(res.body.status === 'success'){
          cookie.save('authToken', res.body.token);
          dispatch(loginSuccess(res.body.user, res.body.token));
        } else {
          if (res.status === 403) {
            dispatch(requireAuthentication(res.body.user, res.body.message));
          } else {
            dispatch(loginFail({error:res.body.message}));
          }
        }
      })
  };
}
export function attemptFacebookLogin(token) {
  console.log(token);
  return (dispatch) => {
    dispatch(clickedLogin());
    request
      .post(ROOT_URL + '/authenticateOrCreateByFB')
      .send({ 
        facebookToken: token
      })
      .end(function(err,res){
        console.log(res);
        console.log(err);
        if(res.body.status === 'success'){
          cookie.save('authToken', res.body.token);
          dispatch(loginSuccess(res.body.user, res.body.token));
        } else {
          dispatch(loginFail({error:res.body.message}));
        }
      })
  };
}


/*  logout */
export function clickedLogout() {
    return { type: Clicked_Logout };
}
export function logoutSuccess() {
    return { type: Logout_Success };
}
export function attemptLogout() {
  return (dispatch) => {
    dispatch(clickedLogout());
    request
      .post('/logout')
      .end(function(err,res) {
        if(err)
          console.log(err)
        dispatch(logoutSuccess());
      })
  }
}

export function clearUser() {
  return { type: CLEAR_USER };
}


export function navigatedAwayFromAuthFormPage() {
    return { type: Navigate_Away_From_Auth_Form };
}
