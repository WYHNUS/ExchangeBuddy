import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const MessageSnackbar = ({ actions, open, message }) =>
  <Snackbar
    open={ open }
    message={ message }
    autoHideDuration={2000}
    onRequestClose={ actions.hideNotifBar } />;

MessageSnackbar.propTypes = {
  actions: React.PropTypes.object.isRequired,
  open: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string.isRequired,
};

export default MessageSnackbar;
