import React from 'react';
import cn from 'classnames';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import { TextFormField } from 'components/Field';
import Icon from 'components/Icon';
import IconButton from 'material-ui/IconButton';

import { userPropType, feedPostCommentPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
import './GroupFeedPostWriteReply.scss';

const validate = ({ content }) => {
  const errors = {};

  if (!content || !content.length)
    errors.content = 'Speak up, my friend!';

  return errors;
};

const GroupFeedPostWriteReply = ({ feedComment, user, refreshComments, isOpen, handleCloseReplyBox, showSnackbar, submitPost, handleSubmit, reset }) => (
  <form onSubmit={ handleSubmit(({ content }) => {
    submitPost({ content, userId: user.id, feedPostCommentId: feedComment.id }, () => {
      reset();
      refreshComments();
    }, (err) => {
      showSnackbar('Could not add reply: ' + err);
    });
  }) }>
    <div className={ cn('group-feed-post-write-reply', { visible: isOpen }) }>
      <IconButton onClick={ handleCloseReplyBox }>
        <Icon name="close" color={ Colors.grey500 } size={16} />
      </IconButton> 

      <TextFormField 
        name="content" 
        hintText="Reply" 
        underlineShow={ false } 
        style={{ fontSize: 12 }}
        errorStyle={{ display: 'none' }} />

      <IconButton type="submit">
        <Icon name="send" color={ Colors.grey500 } size={16} />
      </IconButton> 
    </div>
  </form>
);

GroupFeedPostWriteReply.propTypes = {
  ...reduxFormPropTypes,
  user: userPropType.isRequired,
  feedComment: feedPostCommentPropType.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  refreshComments: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool,
  handleCloseReplyBox: React.PropTypes.func.isRequired,
};

export default reduxForm({
  validate
})(GroupFeedPostWriteReply);