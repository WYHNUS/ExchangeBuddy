// import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { findHomeUniEmailDomain } from '../../../actions/utilityInfo';
import { saveSignupPageThreeInfo } from '../../../actions/user';
// Component
import ChildComponent from './Step3';

// redux
const mapStateToProps = (state) => {
  return {
    homeUniName: state.user.signupInfo.homeUniName,
    emailDomains: state.utilityInfo.emailDomains
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    findHomeUniEmailDomain: (uniName, allUniList) => dispatch(findHomeUniEmailDomain(uniName, allUniList)),
    saveData: (email) => dispatch(saveSignupPageThreeInfo(email)),
  };
};

const Step3 = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default Step3;
