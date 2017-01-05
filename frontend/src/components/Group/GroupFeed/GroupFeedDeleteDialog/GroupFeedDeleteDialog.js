import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconContainer from 'components/IconContainer';

import * as Colors from 'material-ui/styles/colors';

const GroupFeedDeleteDialog = ({ toSubmit, submitDelete, isOpen, handleCloseDialog, showSnackbar, afterDelete }) => (
  <Dialog 
    open={ isOpen }
    onRequestClose={ handleCloseDialog }
    actions={[
      <FlatButton label="Cancel" labelStyle={{ color: Colors.grey500 }} onClick={ handleCloseDialog } />,
      <FlatButton 
        primary 
        label="Delete" 
        onClick={ () => submitDelete(toSubmit, () => {
          handleCloseDialog();
          afterDelete && afterDelete();
          showSnackbar('Post deleted.');
        }, (err) => {
          handleCloseDialog();
          showSnackbar('Could not delete post: ' + err);
        }) } />
    ]}>
    <IconContainer icon="warning" title="Are you sure you want to delete your post?" />
  </Dialog>
);

GroupFeedDeleteDialog.propTypes = {
  toSubmit: React.PropTypes.object,
  endpoint: React.PropTypes.string.isRequired,
  submitDelete: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool,
  handleCloseDialog: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  afterDelete: React.PropTypes.func,
};

export default GroupFeedDeleteDialog;