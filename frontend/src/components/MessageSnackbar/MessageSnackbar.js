import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const MessageSnackbar = ({ actions, open, message }) =>
  <Snackbar
    open={ open }
    message={ message }
    autoHideDuration={2000}
    onRequestClose={ actions.hideSnackbar } 
    />;
    /*style="z-index: 100" */

export default MessageSnackbar;
