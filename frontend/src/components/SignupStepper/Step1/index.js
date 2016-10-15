import React from 'react';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { saveSignupPageOneInfo } from '../../../actions/user';
// Component
import ChildComponent from './Step1';

// redux
const mapStateToProps = (state) => {
  return{
    initialValues: { 
      displayName: state.user.signupInfo.displayName, 
      gender: state.user.signupInfo.gender, 
      homeUniName: state.user.signupInfo.homeUniName 
    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    saveData: (val) => dispatch(saveSignupPageOneInfo(val)),
  };
};

const Step1 = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default Step1;
