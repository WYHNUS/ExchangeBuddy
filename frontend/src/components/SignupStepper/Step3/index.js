// import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
	saveSignupPageThreeInfo, 
	submitSignupForm, signupSuccess, signupFail
} from '../../../actions/user';
// Component
import ChildComponent from './Step3';

// redux
const mapStateToProps = (state) => {
  return {
    homeUniName: state.user.signupInfo.homeUniName,
    allSignupInfo: state.user.signupInfo,
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

const Step3 = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default Step3;
