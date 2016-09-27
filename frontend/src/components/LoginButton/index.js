import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../../client/actions/snackbar';

// Component
import ChildComponent from './LoginButton';

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
  };
};

const LoginButton = connect(null, mapDispatchToProps)(ChildComponent);

export default LoginButton;
