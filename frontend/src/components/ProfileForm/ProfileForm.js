import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import { TextField, Toggle} from 'redux-form-material-ui';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { DropzoneFormField, PasswordFormField } from 'components/Field';

import { ROOT_URL } from 'util/backend';
import { bearer } from 'util/bearer';
import request from 'superagent';
import cookie from 'react-cookie';

const FILE_FIELD_NAME = 'files'; 

const uploadFile=(data, clearUser)=>{
  //console.log('called superagent file request');
  const formData = new FormData();
  formData.append('profilePicture',data.files[0]);
  // console.log(formData);
  var req = request
    .post(ROOT_URL + '/uploadProfile')
    .send(formData)
    .use(bearer)
    .end((err,res)=>{
      // console.log(err,res);
      if (res.status === 401) {
        cookie.remove('authToken');
        clearUser();
        // need to redirect to a new version of login page
        browserHistory.push('/');
      } 

      if (!err && !res.error){
        browserHistory.push('/profile/me'); 
        // console.log('uploaded');
      } else {
        // console.log('server error');
      }
    })
};

const profileForm=(callback, editProfile, userId, clearUser)=>(values)=>{
  //console.log(values);
  callback();
  editProfile(values.userName, values.userPassword);
  // console.log(values.files);
  if((values.files!=null)&&(values.files.length>0)){
    uploadFile(values, clearUser);
  }else{
    browserHistory.push('/profile/me');  
  }

};

const validate = (values) => {
  const errors = {};
  const { userPassword, userConfirmPassword, userName } = values;

  const requiredFields=['userName'];
  
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if (userName) {
    if (userName.length < 8) {
      errors['userName'] = 'Please enter a name longer than 8 chars!';
    }
  }

  if (!!userPassword && !!userConfirmPassword) {
    if ((userPassword.length < 8)&&(userPassword.length!==0)) {
      errors['userPassword'] = 'Secure password (at least 8 digits) is the new fashion!';
    } else if (userPassword !== userConfirmPassword) {
      errors['userConfirmPassword'] = 'Two passwords must match';
    }
  }
  
  return errors;
};

class ProfileForm extends Component {
  
  state = {
    files: []
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, 
      userObject, editProfile, clearUser } = this.props;

    const submitHandler = handleSubmit(profileForm(reset, editProfile, userObject.id, clearUser));

    return (
      <div className="page-profile-submit row center-xs">
      <div className="col-xs-12">
      <form onSubmit={ submitHandler }>
      <div className="row center-xs">
      <Field 
        name="userName" 
        component={PrefilledNamePicker} 
        defaultValue={userObject.name}
        className="profile-editfield"/>
      </div>
      <div className="row center-xs">
      <TextField
        className="profile-editfield"
        disabled
        hintText="Your email address"
        defaultValue={userObject.email}
        floatingLabelText="Your email address"/>
      </div>
      <div className="row center-xs">
      <PasswordFormField
        className="profile-editfield"
        name="userPassword" 
        floatingLabelText="Your new password (more than 8 digits)" />
      </div>
      <div className="row center-xs">
      <PasswordFormField
        name="userConfirmPassword" 
        floatingLabelText="Confirm your new password"
        className="profile-editfield" />
      </div>

      <p className="profilepic-title">Profile Picture</p>
      <div className="row center-xs">
      <DropzoneFormField name={FILE_FIELD_NAME} />
      </div>

      <div className="row center-xs" style={{ marginTop: 18 }}>
        <div className="info-container-col signup-button-container">
          <RaisedButton className="raised-btn" disabled={pristine || submitting}
          label="Submit Changes" primary type="submit" style={{ width: '100%' }}/>
        </div>
      </div>

      </form>

      </div>
      </div>
    )
  }

  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles
    });
  }

  onOpenClick () {
    this.dropzone.open();
  }

}

class PrefilledNamePicker extends React.Component {
  render() {
    const { value,onChange } = this.props.input;
    const { defaultValue } = this.props;
    const { error } = this.props.meta;

    return (
      <TextField
        className="profile-editfield"
        errorText={error}
        hintText="Your name"
        floatingLabelText="Your name"
        onChange={(x,newName)=>{
          onChange(newName);
        }}
        defaultValue={defaultValue} />
    );
  }
}

export default reduxForm({
  form: 'profileForm'
  ,validate
})(ProfileForm);