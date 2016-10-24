import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import { TextFormField } from '../../../Field';
import $ from "jquery";

import * as UserHelper from '../../../../util/user';

const submitForm = (callback, socket, updateGroupMessageFromSocket) => (values) => {
  //const params = { userToken: Meteor.userToken(), userId: Meteor.userId(), groupId: groupId, content: values.message, type: "user" };
  /*console.log({
    userToken: 13829471,
    userId: 1,
    content: values.message,
    type: "user"
  })*/
  callback();
  socket.send(values.message);
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
    const { handleSubmit, pristine, reset, submitting, user, socket, updateGroupMessageFromSocket } = this.props;

    //console.log(handleSubmit);

    const submitHandler = handleSubmit(submitForm(reset, socket, updateGroupMessageFromSocket));

    return (
      <form onSubmit={ submitHandler }>
        <div className="message-send-row">
          <div className="message-user-avatar">{ UserHelper.getAvatar(user.userObject, 48) }</div>

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

SubmitForm.propTypes = {
  socket: PropTypes.object.isRequired
};


// Decorate with redux-form
export default reduxForm({
  form: 'submitForm'
})(SubmitForm);
