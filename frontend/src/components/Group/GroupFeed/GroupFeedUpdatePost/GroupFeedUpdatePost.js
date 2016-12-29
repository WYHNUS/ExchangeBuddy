import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import FlatButton from 'material-ui/FlatButton';
import { TextFormField } from 'components/Field';
import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import Paper from 'components/Paper';

import { getAvatarUrl } from 'util/user';
import { userPropType, feedPostPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';

const validate = ({ content }) => {
  const errors = {};

  if (!content || !content.length)
    errors.content = 'Speak up, my friend!';

  return errors;
};


const GroupFeedUpdatePost = ({ user, feedPost, handleSubmit, submitPost, showSnackbar, refreshGroupFeed, stopEditingFeedPost }) => (
  <div className="group-feed-update-post">
    <Paper full>
      <AvatarRow avatar={ getAvatarUrl(user) } className="post-header-row">
        <div className="post-header">
          <span className="post-title"> 
            <span className="post-author-name">{ user.name }</span>
          </span>
          <span className="post-subtitle">Editing post</span>
        </div>
      </AvatarRow>

      <form 
        onSubmit={ handleSubmit(({ content }) => {
          submitPost({ feedPostId: feedPost.id, content }, () => {
            stopEditingFeedPost();
            refreshGroupFeed();
            showSnackbar('Updated post!');
          }, (err) => {
            showSnackbar('Could not update post: ' + err);
          });
        }) }>

        <Paper transparent>
          <TextFormField 
            name="content" 
            multiLine
            underlineShow={false}
            style={{ fontSize: 14 }}
            errorStyle={{ display: 'none' }} />
          <div className="end-xs">
            <FlatButton label="Cancel" labelStyle={{ color: Colors.grey500 }} onClick={ stopEditingFeedPost } />
            <FlatButton type="submit" label="Update" labelStyle={{ color: Colors.grey700 }} icon={ <Icon name="send" color={ Colors.grey700 } /> } />
          </div>
        </Paper>
      </form>
    </Paper>
  </div>
);

GroupFeedUpdatePost.propTypes = {
  ...reduxFormPropTypes,
  user: userPropType.isRequired,
  feedPost: feedPostPropType.isRequired,
  submitPost: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  refreshGroupFeed: React.PropTypes.func.isRequired,
  stopEditingFeedPost: React.PropTypes.func.isRequired,
};

export default reduxForm({
  validate
})(GroupFeedUpdatePost);