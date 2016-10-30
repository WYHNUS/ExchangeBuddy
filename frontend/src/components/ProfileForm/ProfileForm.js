import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import request from 'superagent';
import { TextField, Toggle} from 'redux-form-material-ui';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';

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

const validate = values => {
  const errors = {};
  const requiredFields = [ 'title', 'details', 'address' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  return errors;
}

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

    			<div className="row center-xs">
    			<div className="col-xs-11 col-md-8">
    			<Field name="title" component={TextField} fullWidth={true}
    			floatingLabelText="Event Title" floatingLabelStyle={{left: 0}}
    			errorStyle={{textAlign: "left"}}
    			multiLine={false} />
    			</div>
    			</div>
    			<div className="row center-xs">
    			<div className="col-xs-11 col-md-8">
    			<Field name="details" component={TextField} fullWidth={true}
    			floatingLabelText="Event Details" floatingLabelStyle={{left: 0}}
    			errorStyle={{textAlign: "left"}}
    			multiLine={true} rows={3}/>
    			</div>
    			</div>

    			<div className="col-xs-12">
    			<RaisedButton type="submit" label="Submit"
    			labelStyle={{fontSize:"1.2rem"}} style={{margin: "2vh 0 5vh", width: "50%"}}
    			disabled={pristine || submitting} primary={true}
    			/>
    			</div>
    			</form>
    			)
    	}
    }

    export default reduxForm({
    	form: 'profileForm'
    	,validate
    })(ProfileForm);