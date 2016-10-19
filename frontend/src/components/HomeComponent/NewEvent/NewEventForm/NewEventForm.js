import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { browserHistory } from 'react-router'
import request from 'superagent'
import { TextField, Toggle} from 'redux-form-material-ui'
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import ImageUpload from '../../../ImageUpload/index.js'
import validUrl from 'valid-url'
import GoogleMap from 'google-map-react';

const newEventForm = (callback, userId, location, id, postEvents, showSnackbar) => (values) => {

  //console.log(values);
  //values.startTime=Date();
  //value.endTime=Date();

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

  //if there are some errors, show them!
  if(errors.length===0){
    callback();
    showSnackbar('Event created!');
    //browserHistory.push(`home/${id}/events`);
    browserHistory.push('login');
  }else{
    showSnackbar(errors[0]);
    console.log(errors);
  }

  
  //console.log(values);

  /*postEvents(
    1.34132,
    109.3214,
    values.title,
    Date(),//values.startTime,
    Date(),//values.endTime,
    values.details,
    null,
    id,
    userId
     );
*/
  /*if(dropId){
    // If edit/:dropId route
    values.dropId = dropId;
    values.userId = user.userId;
    request
    .put('/api/feeds')
    .send(values)
    .end((err,res) => {
      passSnackbarMessage('Updated message details');
      browserHistory.push('/profile');
    })
  } else if (navigator.geolocation) {
    passSnackbarMessage('Getting location and submitting..')
    navigator.geolocation.getCurrentPosition(position=>{
      socketHandler.post({
        userID: user.userId,
        emoji: values.emojiUni,
        title: values.title,
        video: values.videoUrl,
        image: values.imageId,
        sound: values.soundCloudUrl,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        date: moment(),
        anonymous: values.anonymous ? 1 : 0
      });
      browserHistory.push('/drops')
    });
  }
*/
}

const validate = values => {
  const errors = {};
  const requiredFields = [ 'title', 'details' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  //logic to check for date fields
  /*const dateFields = ['startDate', 'startTime', 'endDate', 'endTime'];
  var allDateFieldsFilled = true;
  dateFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
      allDateFieldsFilled=false;
    }
  });
  //logic to check if end time is more than start time
  if(allDateFieldsFilled){
    if(values['startDate']===values['endDate']){
      if(values['startTime']>values['endTime']){
        errors['startTime'] = 'More than End Time';
        errors['endTime'] = 'Less than Start Time';   
      }
    }
  }*/

  /*const urlFields = [ 'soundCloudUrl', 'videoUrl' ];
  urlFields.forEach(field => {
    const str = values[field];
    if(str && str.length > 0 && !validUrl.isUri(str)){
      errors[ field ] = 'Invalid Link'
    }
  })*/

  return errors;
}


class NewEventForm extends Component {
    static defaultProps = {
    	center: {lat: 59.938043, lng: 30.337157},
    	zoom: 9
    };

  constructor(props){
    super(props);
    const minDate = new Date();
    this.state={
      minDate:minDate
    }
    this.updateMinDate=this.updateMinDate.bind(this);
  }

  updateMinDate(date){
    this.setState({...this.state, minDate:date});
    //console.log(this.state.minDate);
  }


  componentDidMount() {
    
    //this.clickedDrop = selectedDrop.selectedDropSrc === "profile" ? profileDrops[selectedDrop.selectedDropIdx] : null;

    /*if(this.props.route.path === "add"){
      this.props.initialize({});

    }else if(this.clickedDrop){
      console.log(this.clickedDrop)
      this.props.initialize(this.clickedDrop);

    } else{
      request
      .get('/api/feeds/'+this.props.params.dropId)
      .end((err,res) => {
        this.props.initialize(res.body);
      })
    }*/
  }

  /*componentDidUpdate(prevProps) {
    // Clear form if going from edit to add message route
    if(prevProps.routes[1].path.substring(0,4) === "edit" && this.props.route.path === "add")
      this.props.initialize({})
  }*/

  render() {
    const { handleSubmit, pristine, reset, submitting, location, user, postEvents, showSnackbar } = this.props;
    const {userId} = user.userObject; 
    const {id} = this.props.homeGroupDetails.homeGroupDetails;

    const submitHandler = handleSubmit(newEventForm(reset, userId, location, id, postEvents, showSnackbar));

    return (
      <form onSubmit={ submitHandler }>
      <h1>{id ? 'Edit event' : 'New event'}</h1>

      <div className="row center-xs">
        <div className="col-xs-11 col-md-8">
          <Field name="imageUpload" component={ImageUpload}/>
        </div>
      </div>

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

      <div className='row center-xs'>
      <div className='col-xs-11 col-md-6'>
      <div className="row center-xs">
        <div className="col-xs-4">
        <h5>Start Date/Time</h5>
        </div>
        <div className="col-xs-4">
          <Field name="startDate" component={StartDatePick} 
          errorStyle={{textAlign: "left"}}
          updateMinDate={this.updateMinDate}/>
        </div>
        <div className="col-xs-4">
          <Field name="startTime" component={StartTimePick}
          errorStyle={{textAlign: "left"}}/>
        </div>
      </div>
      </div>
      <div className='col-xs-11 col-md-6'>
      <div className="row center-xs">
        <div className="col-xs-4">
        <h5>End Date/Time</h5>
        </div>
        <div className="col-xs-4">
          <Field name="endDate" component={EndDatePick} 
          errorStyle={{textAlign: "left"}}
          minDate={this.state.minDate}/>
        </div>
        <div className="col-xs-4">
          <Field name="endTime" component={EndTimePick}
          errorStyle={{textAlign: "left"}}/>
        </div>
      </div>
      </div>
      </div>

      <div>Insert Google Map Chooser here</div>
      <GoogleMap
	    bootstrapURLKeys = {{key:process.env.GOOGLE_MAP_APIKEY}}
      defaultCenter={this.props.center}
      defaultZoom={this.props.zoom}></GoogleMap>
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

class StartDatePick extends React.Component{
  constructor(props){
    super(props);
    const minDate = new Date();
    this.state={
      minDate:minDate
    }
  }
  render(){
    const {value,onChange} = this.props.input;
    const{updateMinDate}=this.props;
    return(
      <DatePicker 
      className='new-event-date-chooser' 
      hintText="Start Date"
      onChange={(x,newdate)=>{
        onChange(newdate);
        updateMinDate(newdate);
      }}
      minDate={this.state.minDate}
      />
      );
  }
}

//onDismiss={()=>onChange()} 


class StartTimePick extends React.Component{
  render(){
    const {value,onChange} = this.props.input
    return(
      <TimePicker 
      className='new-event-time-chooser' 
      hintText="Start Time"
      onChange={(x,newdate)=>{
        onChange(newdate);
      }}/>
      );
  }
}

class EndDatePick extends React.Component{
  render(){
    const {value,onChange} = this.props.input;
    const{minDate} = this.props;
    return(
      <DatePicker 
      className='new-event-date-chooser' 
      hintText="End Date" 
      onChange={(x,newdate)=>{
        onChange(newdate);
      }}
      minDate={minDate}
      />
      );
  }
}

class EndTimePick extends React.Component{
  render(){
    const {value,onChange} = this.props.input
    return(
      <TimePicker 
      className='new-event-time-chooser' 
      hintText="End Time" 
      onChange={(x,newdate)=>{
        onChange(newdate);
      }}/>
      );
  }
}

NewEventForm.propTypes = {
  homeGroupDetails: PropTypes.object.isRequired,
  postEvents: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired
};



export default reduxForm({
  form: 'newEventForm'
  ,validate
})(NewEventForm);

// Decorate with redux-form
/*NewEventForm = reduxForm({
  form: 'newEventForm',
  validate
})(NewEventForm)
export default NewEventForm;
*/