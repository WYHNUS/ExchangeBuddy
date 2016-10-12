//import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { attemptLogin, navigatedAwayFromAuthFormPage } from '../../actions/authActions';
import { showSnackbar } from '../../actions/messageSnackbar';

// Component
import ChildComponent from './LoginButton';

// redux
function mapStateToProps(state) {
  return {
    userAuthSession: state.user,
    pageVisibility: state.pageVisibility,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
    attemptLogin: (token) => dispatch(attemptLogin(token)),
    navigatedAwayFromAuthFormPage: () => dispatch(navigatedAwayFromAuthFormPage()),
  };
};

const LoginButton = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default LoginButton;
