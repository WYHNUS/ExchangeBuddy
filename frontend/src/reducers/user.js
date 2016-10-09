import {
  Clicked_SignUp, SignUp_Success, SignUp_Fail,
  Clicked_Login, Login_Success, Login_Fail,
  Started_Session_Check, Checked_Session_Status,
  Clicked_Logout, Logout_Success,
  Navigate_Away_From_Auth_Form
} from '../actions/authActions';

import {
  UPDATE_USER_PROFILE
}from '../actions/user';

const initialState = {
  isLoggedIn: false,
  fetchingAuthUpdate: false,
  userObject: 
  {
    email:'',
    displayName:'',
    profilePictureId:'',
    gender:'',
    bio:'',
    website:'',
    birthday:'',
    fbUserId:'',
    fbToken:'',
    fbTokenExpiresAt:'',
    homeUniId: null
  },
  error: null
}

export function user(state = initialState , action) {
  switch (action.type){

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
        userObject: action.userObject,
        error: null
      });

    case Login_Fail:
    case SignUp_Fail:
      return Object.assign({}, state, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
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
        error: null
      });

    default:
      return state;
  }
}
