import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
  submitSignupForm, signupSuccess, signupFail
} from '../../actions/user';
// Component
import ChildComponent from './SignupForm';

// redux
const mapStateToProps = (state) => {
  return {
    submitting: state.user.fetchingAuthUpdate,
    isEmailSent: state.user.isEmailSent,
    authEmailError: state.user.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    submitSignupForm: (signupInfo, email) => {
      dispatch(submitSignupForm(signupInfo, email));
    }
  };
};

const SignupForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default SignupForm;