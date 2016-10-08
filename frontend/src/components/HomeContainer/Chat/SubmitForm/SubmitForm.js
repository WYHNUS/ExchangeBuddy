import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import { TextFormField } from '../../../Field';
import $ from "jquery";

import * as UserHelper from '../../../../util/user';

const submitForm = (groupId, callback) => (values) => {
  const params = { userToken: Meteor.userToken(), userId: Meteor.userId(), groupId: groupId, content: values.message, type: "user" };

  Meteor.call('GroupChatMessage.sendToGroup', params, (err, success) => {
    if (err)
      console.log("Error in invoking GroupChatMessage.sendToGroup: " + err);
    else
      callback();
  });
};

const handleKeyPress = (submitHandler) => (event) => {
  if (event.key == "Enter" && !event.shiftKey && !event.ctrlKey && !event.altKey)
    submitHandler();
};

class SubmitForm extends Component {
  componentDidMount() {
    $(".message-send-field").focus();
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, user, groupId } = this.props;

    const submitHandler = handleSubmit(submitForm(groupId, reset));

    return (
      <form onSubmit={ submitHandler }>
        <div className="message-send-row">
          <div className="message-user-avatar">{ UserHelper.getAvatar(user, 48) }</div>

          <TextFormField
            className="message-send-field"
            name="message"
            component={TextField}
            floatingLabelText="Say something..."
            floatingLabelFixed={true}
            autoComplete="off"
            multiLine={true}
            onKeyPress={ handleKeyPress(submitHandler) }
            rows={2} />

          <IconButton iconClassName="material-icons" className="message-send-button" type="submit" disabled={pristine || submitting}>send</IconButton>
        </div>
      </form>
    )
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'submitForm'
})(SubmitForm);
