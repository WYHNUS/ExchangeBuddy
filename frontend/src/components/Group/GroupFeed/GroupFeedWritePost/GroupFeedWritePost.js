import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import AvatarRow from 'components/AvatarRow';
import Paper from 'components/Paper';
import { TextFormField } from 'components/Field';
import Icon from 'components/Icon';
import FlatButton from 'material-ui/FlatButton';

import { getAvatarUrl } from 'util/user';
import { userPropType, groupPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';

const validate = ({ content }) => {
  const errors = {};

  if (!content || !content.length)
    errors.content = 'Speak up, my friend!';

  return errors;
};

const GroupWritePostForm = ({ group, user, refreshGroupFeed, showSnackbar, submitPost, handleSubmit, reset }) => (
  <Paper>
    <form onSubmit={ handleSubmit(({ content }) => {
      submitPost({ content, userId: user.id, groupId: group.id }, () => {
        reset();
        showSnackbar('Posted to group!');
        refreshGroupFeed();
      }, (err) => {
        showSnackbar('Could not post to group: ' + err);
      });
    }) }>
      <AvatarRow avatar={ getAvatarUrl(user, 40) } valign="top">
        <TextFormField 
          name="content" 
          hintText="Say something to your fellow exchangers!" 
          underlineShow={ false } 
          multiLine 
          style={{ fontSize: 14 }}
          errorStyle={{ display: 'none' }} />
        <div className="end-xs">
          <FlatButton type="submit" icon={ <Icon name="send" color={ Colors.grey500 } /> } label="Post" labelStyle={{ color: Colors.grey500 }} />
        </div>
      </AvatarRow>
    </form>
  </Paper>
);

GroupWritePostForm.propTypes = {
  ...reduxFormPropTypes,
  user: userPropType.isRequired,
  group: groupPropType.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  refreshGroupFeed: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'groupFeedWritePost',
  validate
})(GroupWritePostForm);