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

/*const newEventForm = (callback, userId, isGeocodingError, foundAddress, position, id, postEvents, showSnackbar) => (values) => {

	const errors = [];
	const dateFields = ['startDate', 'startTime', 'endDate', 'endTime'];
	var allDateFieldsFilled = true;
	dateFields.forEach(field => {
		if (!values[ field ]) {
			errors.push(`Please fill up ${field}`);
			allDateFieldsFilled=false;
		}
	});
  //logic to check if end time is more than start time
  if(allDateFieldsFilled){
    //console.log(moment(values['endDate']).isAfter(moment(values['startDate']),'day'));
    if(!moment(values['endDate']).isAfter(moment(values['startDate']),'day')){
    	var beginning = moment(values['startTime']);
    	var ending = moment(values['endTime']);
      //console.log(beginning, ending);
      if(ending.isBefore(beginning)){
      	errors.push('Start time is later than End time...') 
      }
  }
}

if(isGeocodingError){
	errors.push('Please enter a valid address before submitting')
}

  //logic to check if you have actually found an address!

  //if there are some errors, show them!
  if(errors.length===0){
  	callback();
  	console.log(id,userId)
  	postEvents(
  		position.latitude,
  		position.longitude,
  		foundAddress,
  		values.title,
  		values.startTime,
  		values.endTime,
  		values.details,
  		null,
  		id,
  		userId
  		);
  	browserHistory.push(`/home/${id}/events`);

  }else{
  	showSnackbar(errors[0]);
  	console.log(errors);
  }
}*/
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
		const { handleSubmit, pristine, reset, submitting, user, postEvents, showSnackbar } = this.props;
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
          <TextFormField name="userName" floatingLabelText="Your name" />

          <TextField
            disabled={true}
            hintText="Your email address"
            defaultValue="xxx@gmail.com"
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

    export default reduxForm({
    	form: 'profileForm'
    	,validate
    })(ProfileForm);