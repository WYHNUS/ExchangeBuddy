import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
  submitSignupForm, signupSuccess, signupFail
} from 'actions/user';
import { 
  attemptFacebookLogin
} from 'actions/authActions';
// Component
import ChildComponent from './SignupForm';

// redux
const mapStateToProps = (state) => {
  return {
    submitting: state.user.fetchingAuthUpdate,
    userAuthData: state.user,
    authEmailError: state.user.error,
    initialValues: { 
      userName: state.user.signupInfo.displayName, 
      userEmail: state.user.signupInfo.email,
      userPassword: state.user.signupInfo.password
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    submitSignupForm: (signupInfo) => {
      dispatch(submitSignupForm(signupInfo));
    },
    attemptFacebookLogin: (accessToken) => {
      dispatch(attemptFacebookLogin(accessToken));
    }
  };
};

const SignupForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default SignupForm;