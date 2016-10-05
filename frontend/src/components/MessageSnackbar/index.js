import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { hideSnackbar } from '../../actions/messageSnackbar';

// Component
import ChildComponent from './MessageSnackbar';

const mapStateToProps = (state) => {
  return {
    open: state.messageSnackbarOpen,
    message: state.messageSnackbarMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ hideSnackbar }, dispatch),
  };
};

const MessageSnackbar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default MessageSnackbar;
