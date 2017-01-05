import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import GroupFeedPostContent from '../GroupFeedPostContent';
import GroupFeedPostContentAction from '../GroupFeedPostContent/GroupFeedPostContentAction';

import { TextFormField } from 'components/Field';

import { userPropType, feedPostCommentPropType } from 'util/propTypes';

import './GroupFeedPostUpdateComment.scss';

const validate = ({ content }) => {
  const errors = {};

  if (!content || !content.length)
    errors.content = 'Speak up, my friend!';

  return errors;
};


const GroupFeedPostUpdateComment = ({ feedComment, handleSubmit, submitPost, showSnackbar, refresh, stopEditing }) => (
  <div className="comment-main-container">
    <GroupFeedPostContent 
      className="group-feed-post-comment-content editing-comment"
      author={ feedComment.author } 
      content={
        <form 
          onSubmit={ handleSubmit(({ content }) => {
            submitPost({ feedPostCommentId: feedComment.id, content }, () => {
              stopEditing();
              refresh();
              showSnackbar('Updated comment!');
            }, (err) => {
              showSnackbar('Could not update comment: ' + err);
            });
          }) }>

          <TextFormField 
            name="content"
            underlineShow={ false }
            style={{ fontSize: 14 }}
            errorStyle={{ display: 'none' }} />

        </form>
      } 
      contentActions={[
        <GroupFeedPostContentAction key="save" isSubmit primaryText="Save" icon="save" />,
        <GroupFeedPostContentAction key="cancel" primaryText="Cancel" icon="cancel" onClick={ stopEditing } />
      ]} />
  </div>
);

GroupFeedPostUpdateComment.propTypes = {
  ...reduxFormPropTypes,
  user: userPropType.isRequired,
  feedComment: feedPostCommentPropType.isRequired,
  submitPost: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
  stopEditing: React.PropTypes.func.isRequired,
};

export default reduxForm({
  validate
})(GroupFeedPostUpdateComment);