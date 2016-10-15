import {
  Clicked_SignUp, SignUp_Success, SignUp_Fail,
  Clicked_Login, Login_Success, Login_Fail, Not_Registered,
  Started_Session_Check, Checked_Session_Status,
  Clicked_Logout, Logout_Success,
  Navigate_Away_From_Auth_Form
} from '../actions/authActions';

import {
  UPDATE_USER_PROFILE, SAVE_SIGNUP_PAGE_ONE_INFO, SAVE_SIGNUP_PAGE_TWO_INFO, SAVE_SIGNUP_PAGE_THREE_INFO
} from '../actions/user';

const initialState = {
  isAuthenticated: false,
  isLoggedIn: false,
  isRegistered: null,
  fetchingAuthUpdate: false,
  token: null,
  error: null,
  userObject: {
    email:'',
    name:'',
    profilePictureUrl:'',
    gender:'',
    bio:'',
    website:'',
    birthday:'',
    fbUserId:'',
    fbToken:'',
    fbTokenExpiresAt:'',
    UniversityId: null
  },
  signupInfo: {
    displayName: '',
    gender: '',
    homeUniName: '',
    exchangeUniName: '',
    exchangeUniYear: '',
    exchangeTerm: '',
    emailDomains: ''
  }
}

export function user(state = initialState , action) {
  switch (action.type){
    case SAVE_SIGNUP_PAGE_ONE_INFO:
      return Object.assign({}, state, {
        signupInfo: {
          displayName: action.field.displayName,
          gender: action.field.gender,
          homeUniName: action.field.homeUniName,
          exchangeUniName: state.signupInfo.exchangeUniName,
          exchangeUniYear: state.signupInfo.exchangeUniYear,
          exchangeTerm: state.signupInfo.exchangeTerm,
          emailDomain: state.signupInfo.emailDomain
        }
      });
    case SAVE_SIGNUP_PAGE_TWO_INFO:
      return Object.assign({}, state, {
        signupInfo: {
          displayName: state.signupInfo.displayName,
          gender: state.signupInfo.gender,
          homeUniName: state.signupInfo.homeUniName,
          exchangeUniName: action.field.exchangeUniName,
          exchangeUniYear: action.field.exchangeUniYear,
          exchangeTerm: action.field.exchangeTerm,
          emailDomain: state.signupInfo.emailDomain
        }
      });
    case SAVE_SIGNUP_PAGE_THREE_INFO:
      return Object.assign({}, state, {
        signupInfo: {
          displayName: state.signupInfo.displayName,
          gender: state.signupInfo.gender,
          homeUniName: state.signupInfo.homeUniName,
          exchangeUniName: state.signupInfo.exchangeUniName,
          exchangeUniYear: state.signupInfo.exchangeUniYear,
          exchangeTerm: state.signupInfo.exchangeTerm,
          emailDomain: action.emailDomains
        }
      });

    case UPDATE_USER_PROFILE:
    return Object.assign({}, state, {
        userObject: {...state.userObject}
      });

    case Started_Session_Check:
    case Clicked_Login:
    case Clicked_SignUp:
    case Clicked_Logout:
      return Object.assign({}, state, {
        fetchingAuthUpdate: true
      });

    case Login_Success:
    case SignUp_Success:
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
    case SignUp_Fail:
      return Object.assign({}, state, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        isAuthenticated: false,
        isRegistered: null,
        error: action.error
      });

    case Not_Registered:
      return Object.assign({}, state, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        isAuthenticated: false,
        isRegistered: false,
        error: action.error
      });

    case Checked_Session_Status:
      if (action.result && action.result.isLoggedIn){
        return Object.assign({}, state, {
          isLoggedIn: true,
          fetchingAuthUpdate: false,
          userObject: action.result.user,
          error: null
        });
      }
      // set to default conditions
      // (ignore errors and let login/signup handle server errors)
      return  Object.assign({}, initialState);

    case Logout_Success:
      return Object.assign({}, initialState);

    case Navigate_Away_From_Auth_Form:
      return Object.assign({}, state, {
        isRegistered: null,
        error: null
      });

    default:
      return state;
  }
}
