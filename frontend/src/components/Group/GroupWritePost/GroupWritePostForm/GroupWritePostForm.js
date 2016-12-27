import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import AvatarRow from 'components/AvatarRow';
import { TextFormField } from 'components/Field';
import Icon from 'components/Icon';
import FlatButton from 'material-ui/FlatButton';

import { getAvatarUrl } from 'util/user';
import { userPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';

const submitForm = (values) => {
  console.log(values);
};

const validate = () => {
  const errors = {};

  return errors;
};

const GroupWritePostForm = ({ user, handleSubmit }) => (
  <form onSubmit={ handleSubmit(submitForm) }>
    <AvatarRow avatar={ getAvatarUrl(user, 40) } valign="top">
      <TextFormField 
        name="feedPostText" 
        hintText="Say something to your fellow exchangers!" 
        underlineShow={ false } 
        multiLine 
        style={{ fontSize: 14 }} />
      <div className="end-xs">
        <FlatButton icon={ <Icon name="send" color={ Colors.grey500 } /> } label="Post" labelStyle={{ color: Colors.grey500 }} />
      </div>
    </AvatarRow>
  </form>
);

GroupWritePostForm.propTypes = {
  ...reduxFormPropTypes,
  user: userPropType.isRequired,
};

export default reduxForm({
  form: 'groupWritePostForm',
  validate
})(GroupWritePostForm);