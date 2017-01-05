import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import GroupFeedPostContent from '../GroupFeedPostContent';
import GroupFeedPostContentAction from '../GroupFeedPostContent/GroupFeedPostContentAction';

import { TextFormField } from 'components/Field';

import { userPropType, feedPostCommentReplyPropType } from 'util/propTypes';

import './GroupFeedPostUpdateReply.scss';

const validate = ({ content }) => {
  const errors = {};

  if (!content || !content.length)
    errors.content = 'Speak up, my friend!';

  return errors;
};


const GroupFeedPostUpdateReply = ({ feedCommentReply, handleSubmit, submitPost, showSnackbar, refresh, stopEditing }) => (
  <form 
    onSubmit={ handleSubmit(({ content }) => {
      submitPost({ feedPostCommentReplyId: feedCommentReply.id, content }, () => {
        stopEditing();
        refresh();
        showSnackbar('Updated reply!');
      }, (err) => {
        showSnackbar('Could not update reply: ' + err);
      });
    }) }>

    <GroupFeedPostContent 
      className="group-feed-post-comment-reply-content editing-reply"
      author={ feedCommentReply.author } 
      avatarSize={ 20 }
      content={
        <TextFormField 
          name="content"
          underlineShow={ false }
          style={{ fontSize: 14 }}
          errorStyle={{ display: 'none' }} />
      } 
      contentActions={[
        <GroupFeedPostContentAction key="save" isSubmit primaryText="Save" icon="save" />,
        <GroupFeedPostContentAction key="cancel" primaryText="Cancel" icon="cancel" onClick={ stopEditing } />
      ]}
      showRightMenu={ false } />

  </form>
);

GroupFeedPostUpdateReply.propTypes = {
  ...reduxFormPropTypes,
  user: userPropType.isRequired,
  feedCommentReply: feedPostCommentReplyPropType.isRequired,
  submitPost: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
  stopEditing: React.PropTypes.func.isRequired,
};

export default reduxForm({
  validate
})(GroupFeedPostUpdateReply);