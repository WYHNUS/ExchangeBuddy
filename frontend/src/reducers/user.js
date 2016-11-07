import {
  Clicked_Login, Login_Success, Login_Fail, Not_Authenticated,
  Clicked_Logout, Logout_Success,
  VERIFY_TOKEN_SUCCESS, VERIFY_TOKEN_FAIL,
  Navigate_Away_From_Auth_Form, CLEAR_USER
} from '../actions/authActions';

import {
  UPDATE_USER_PROFILE, SAVE_SIGNUP_INFO,
  CLICKED_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL
} from '../actions/user';

import {
  EDIT_UNIVERSITIES, EDIT_UNIVERSITIES_SUCCESS, EDIT_UNIVERSITIES_FAILURE, EDIT_PROFILE_SUCCESS
} from '../actions/profile';

const initialState = {
  isAuthenticated: false,
  isEmailSent: false,
  isLoggedIn: false,
  isRegistered: false,
  fetchingAuthUpdate: false,
  token: null,
  error: null,
  userObject: {
    userId: -1,
    email: '',
    name: '',
    profilePictureUrl: '',
    gender: '',
    bio: '',
    fbUserId: '',
    fbToken: '',
    UniversityId: null
  },
  signupInfo: {
    fbToken: '',
    displayName: '',
    email: '',
    password: ''
  }
}

export function user(state = initialState , action) {
  switch (action.type){

    /*when edit profile is done, update user state too*/
    case EDIT_PROFILE_SUCCESS:
      return Object.assign({},state,{
        userObject: {...state.userObject, name:action.profile}
      })

    /*    verification of token received via email    */
    case VERIFY_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isRegistered: true,
        isAuthenticated: true,
        userObject: action.user,
        token: action.token,
        error: null
      });

    case VERIFY_TOKEN_FAIL:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isLoggedIn: false,
        error: action.error
      });

    /*    edit university     */
    case EDIT_UNIVERSITIES:
      return Object.assign({}, state, {
        fetchingAuthUpdate: true,
        error: null
      });
    case EDIT_UNIVERSITIES_SUCCESS:
      // console.log(action.user);
      return Object.assign({}, state, {
        fetchingAuthUpdate: false,
        userObject: action.user,
        error: null
      });
    case EDIT_UNIVERSITIES_FAILURE:
      // console.log(action.error);
      return Object.assign({}, state, {
        fetchingAuthUpdate: false,
        error: action.error
      });

    case SAVE_SIGNUP_INFO:
      return Object.assign({}, state, {
        signupInfo: {
          displayName: action.field.userName,
          email: action.field.userEmail,
          password: action.field.userPassword
        }
      });

    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isLoggedIn: false,
        isEmailSent: true,
        isRegistered: true,
        fetchingAuthUpdate: false,
        error: null
      });

    case SIGNUP_FAIL:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isEmailSent: false,
        fetchingAuthUpdate: false,
        isAuthenticated: false,
        isRegistered: false,
        error: action.error.error
      });
  

    /*    login flow    */
    case Login_Success:
      return Object.assign({}, state, {
        isLoggedIn: true,
        fetchingAuthUpdate: false,
        isAuthenticated: true,
        isRegistered: true,
        userObject: action.userObject,
        token: action.token,
        error: null
      });

    case Login_Fail:
      return Object.assign({}, state, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        // set isRegistered to true to prevent auto redirect to signup page (might have a better way to do this?)
        isRegistered: true,
        error: action.error
      });

    case Not_Authenticated:
      return Object.assign({}, state, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        isAuthenticated: false,
        isEmailSent: true,
        isRegistered: true,
        token: null,
        error: action.error,
        signupInfo: {
          email: action.user.email,
          password: action.user.password
        }
      });


    /*    logout */
    case Logout_Success:
      return Object.assign({}, initialState);


    /*    Click ajax call    */
    case Clicked_Login:
    case CLICKED_SIGNUP:
    case Clicked_Logout:
      return Object.assign({}, state, {
        fetchingAuthUpdate: true
      });


    /*    others    */
    case CLEAR_USER:
      return Object.assign({}, state, {
        isLoggedIn:false,
        fetchingAuthUpdate:false,
        isAuthenticated:false,
        isEmailSent: false,
        isRegistered: false,
        userObject: {},
        signupInfo: {},
        token: null,
        error: null
      });

    case Navigate_Away_From_Auth_Form:
      return Object.assign({}, state, {
        isRegistered: null,
        error: null
      });

    case UPDATE_USER_PROFILE:
      return Object.assign({}, state, {
        userObject: {...state.userObject}
      });

    default:
      return state;
  }
}
