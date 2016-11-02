import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import request from 'superagent';
import { TextField, Toggle} from 'redux-form-material-ui';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

import { TextFormField } from '../Field';
import { PasswordFormField } from '../Field';

const profileForm=(callback, editProfile, userId)=>(values)=>{
  callback();
  editProfile(values.userName, values.userPassword);
	browserHistory.push('/profile/me');
}

const validate = (values) => {
  const errors = {};
  const { userPassword, userConfirmPassword, userName } = values;

  const requiredFields=['userName'];
  
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if(!!userName){
    if(userName.length<8){
      errors['userName']='Please enter a name longer than 8 chars!'
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

	constructor(props){
		super(props);
	}
	render() {
		const { handleSubmit, pristine, reset, submitting, userObject, editProfile } = this.props;

    const submitHandler = handleSubmit(
    	profileForm(reset, editProfile, userObject.id));

    		return (
          <div className="page-profile-submit row center-xs">
          <div className='col-xs-12'>
    			<form onSubmit={ submitHandler }>
          <div className="row center-xs">
          <Field 
            name="userName" 
            component={PrefilledNamePicker} 
            defaultValue={userObject.name}
            className='profile-editfield'/>
          </div>
          <div className="row center-xs">
          <TextField
            className='profile-editfield'
            disabled={true}
            hintText="Your email address"
            defaultValue={userObject.email}
            floatingLabelText="Your email address"/>
          </div>
          <div className="row center-xs">
          <PasswordFormField
            className='profile-editfield'
            name="userPassword" 
            floatingLabelText="Your new password (more than 8 digits)" />
          </div>
          <div className="row center-xs">
          <PasswordFormField
            name="userConfirmPassword" 
            floatingLabelText="Confirm your new password"
            className='profile-editfield' />
          </div>

          <div className="row center-xs" style={{marginTop: "18px"}}>
            <div className="info-container-col signup-button-container">
              <RaisedButton className="raised-btn" disabled={pristine || submitting}
              label="Submit Changes" primary={true} type="submit" style={{ width: "100%" }}/>
            </div>
          </div>
    			</form>
          </div>
          </div>
    			)
    	}
    }

class PrefilledNamePicker extends React.Component{
  render(){
    const {value,onChange} = this.props.input;
    const{defaultValue}=this.props;
    const{error}=this.props.meta;
    return(
      <TextField
      className='profile-editfield'
      errorText={error}
      hintText="Your name"
      floatingLabelText="Your name"
      onChange={(x,newName)=>{
        onChange(newName);
      }}
      defaultValue={defaultValue}
      />
      );
  }
}

export default reduxForm({
	form: 'profileForm'
	,validate
})(ProfileForm);