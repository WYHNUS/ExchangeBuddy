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

const profileForm=(callback)=>(values)=>{
	console.log(values);
}

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'userName'];
  const { userPassword, userConfirmPassword } = values;
  
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

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
		const { handleSubmit, pristine, reset, submitting, userObject, showSnackbar } = this.props;
    //const {userId} = user.userObject; 
    //const {id} = this.props.homeGroupDetails.homeGroupDetails;

    const submitHandler = handleSubmit(
    	profileForm(reset));
    /*this.props.user.userObject.id, 
    		this.state.isGeocodingError,
    		this.state.foundAddress, 
    		this.state.position, 
    		id, 
    		postEvents, 
    		showSnackbar*/

    		return (
    			<form onSubmit={ submitHandler }>

          <Field name="userName" component={PrefilledNamePicker} defaultValue={userObject.name}/>

          <TextField
            disabled={true}
            hintText="Your email address"
            defaultValue={userObject.email}
            floatingLabelText="Your email address"/>

          <PasswordFormField
            name="userPassword" floatingLabelText="Your new password (more than 8 digits)" />
          <PasswordFormField
            name="userConfirmPassword" floatingLabelText="Confirm your new password" />

          <div className="row" style={{marginTop: "18px"}}>
            <div className="info-container-col signup-button-container">
              <RaisedButton className="raised-btn" label="Continue" primary={true} type="submit" style={{ width: "100%" }}/>
            </div>
          </div>
    			</form>
    			)
    	}
    }

class PrefilledNamePicker extends React.Component{
  render(){
    const {value,onChange} = this.props.input;
    const{defaultValue}=this.props;
    return(
      <TextField 
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