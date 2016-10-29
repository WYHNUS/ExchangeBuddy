import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
  attemptLogin, loginSuccess, loginFail
} from '../../actions/user';
// Component
import ChildComponent from './LoginForm';

// redux
const mapStateToProps = (state) => {
  return {
    submitting: state.user.fetchingAuthUpdate,
    isLoggedIn: state.user.isLoggedIn,
    isAuthenticated: state.user.isAuthenticated,
    isRegistered: state.user.isRegistered,
    loginError: state.user.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    attemptLogin: (signupInfo, email) => {
      dispatch(attemptLogin(signupInfo, email));
    }
  };
};

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default LoginForm;