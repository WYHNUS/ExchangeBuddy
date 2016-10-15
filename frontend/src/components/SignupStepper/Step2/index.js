// import { Meteor } from 'meteor/meteor';
import React from 'react';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { saveSignupPageTwoInfo } from '../../../actions/user';
// Component
import ChildComponent from './Step2';

// redux
const mapStateToProps = (state) => {
  return {
    initialValues: { 
      exchangeUniYear: state.user.signupInfo.exchangeUniYear,
      exchangeUniName: state.user.signupInfo.exchangeUniName,
      exchangeTerm: state.user.signupInfo.exchangeTerm
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    saveData: (val) => dispatch(saveSignupPageTwoInfo(val)),
  };
};

const Step2 = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default Step2;
