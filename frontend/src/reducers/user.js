import {
  Clicked_Login, Login_Success, Login_Fail, Not_Registered,
  Clicked_Logout, Logout_Success,
  VERIFY_TOKEN_SUCCESS, VERIFY_TOKEN_FAIL,
  Navigate_Away_From_Auth_Form,CLEAR_USER
} from '../actions/authActions';

import {
  UPDATE_USER_PROFILE, SAVE_SIGNUP_PAGE_ONE_INFO, SAVE_SIGNUP_PAGE_TWO_INFO,
  CLICKED_SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL
} from '../actions/user';

const initialState = {
  isAuthenticated: false,
  isEmailSent: false,
  isLoggedIn: false,
  isRegistered: false,
  fetchingAuthUpdate: false,
  token: null,
  error: null,
  userObject: {
    userId:-1,
    email:'',
    name:'',
    profilePictureUrl:'',
    gender:'',
    bio:'',
    fbUserId:'',
    fbToken:'',
    UniversityId: null
  },
  signupInfo: {
    fbToken: '',
    displayName: '',
    gender: '',
    homeUniName: '',
    exchangeUniName: '',
    exchangeUniYear: '',
    exchangeTerm: ''
  }
}

export function user(state = initialState , action) {
  switch (action.type){

    /*    verification of token received via email    */
    case VERIFY_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: true,
        isRegistered: true,
        isAuthenticated: true,
        userObject: action.user,
        error: null
      });

    case VERIFY_TOKEN_FAIL:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isLoggedIn: false,
        isRegistered: false,
        error: action.error
      });


    /*    signup flow     */
    case SAVE_SIGNUP_PAGE_ONE_INFO:
      return Object.assign({}, state, {
        signupInfo: {
          fbToken: state.signupInfo.fbToken,
          displayName: action.field.displayName,
          gender: action.field.gender,
          homeUniName: action.field.homeUniName,
          exchangeUniName: state.signupInfo.exchangeUniName,
          exchangeUniYear: state.signupInfo.exchangeUniYear,
          exchangeTerm: state.signupInfo.exchangeTerm
        }
      });
    case SAVE_SIGNUP_PAGE_TWO_INFO:
      return Object.assign({}, state, {
        signupInfo: {
          fbToken: state.signupInfo.fbToken,
          displayName: state.signupInfo.displayName,
          gender: state.signupInfo.gender,
          homeUniName: state.signupInfo.homeUniName,
          exchangeUniName: action.field.exchangeUniName,
          exchangeUniYear: action.field.exchangeUniYear,
          exchangeTerm: action.field.exchangeTerm
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

    case Not_Registered:
      return Object.assign({}, state, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        isAuthenticated: false,
        isRegistered: false,
        error: action.error,
        signupInfo: {
          fbToken: action.fbToken,
          displayName: action.user.name,
          gender: action.user.gender
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
        isRegistered:false,
        userObject:{},
        signupInfo:{},
        token:null,
        error:null
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
