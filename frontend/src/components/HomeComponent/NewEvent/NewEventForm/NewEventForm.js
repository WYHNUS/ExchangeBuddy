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

const newEventForm = (callback, userId, isGeocodingError, foundAddress, position, id, postEvents, showSnackbar) => (values) => {

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
    showSnackbar('Event created!');

  }else{
    showSnackbar(errors[0]);
    console.log(errors);
  }

  
  //console.log(values);



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
  const requiredFields = [ 'title', 'details', 'address' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  return errors;
}

var INITIAL_LOCATION = {
  address: '20 Lower Kent Ridge Rd, Singapore',
  position: {
    latitude: 1.298926,
    longitude: 103.776104
  }
};

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

var INITIAL_MAP_ZOOM_LEVEL = 8;

class NewEventForm extends Component {

  constructor(props){
    super(props);
    const minDate = new Date();
    this.state={
      minDate:minDate,
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address,
      position:INITIAL_LOCATION.position
    }
    this.updateMinDate=this.updateMinDate.bind(this);
    this.updateMap=this.updateMap.bind(this);
    this.setMapElementReference=this.setMapElementReference.bind(this);
    this.setSearchInputElementReference=this.setSearchInputElementReference.bind(this);
  }

  setSearchInputElementReference(inputReference) {
    this.searchInputElement = inputReference;
  }

  updateMinDate(date){
    this.setState({...this.state, minDate:date});
    //console.log(this.state.minDate);
  }

  updateMap(isGeocodingError, foundAddress, position){
    this.setState({...this.state, isGeocodingError:isGeocodingError, 
      foundAddress:foundAddress, position:position})
  }

  setMapElementReference(mapElementReference){
    this.mapElement = mapElementReference;
  }


  componentDidMount() {
    this.map = new google.maps.Map(this.mapElement, {
        zoom: INITIAL_MAP_ZOOM_LEVEL,
        center: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        },
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: false
      });

    this.marker = new google.maps.Marker({
        map: this.map,
        position: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        }
    });
    this.geocoder = new google.maps.Geocoder();
    console.log(this.map,this.marker, this.geocoder);
  }

  geocodeAddress(address) {
    //console.log('address', address);
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      console.log(results);
      if (status === google.maps.GeocoderStatus.OK) {

        //console.log(this.state);
        this.setState({
          ...this.state,
          foundAddress: results[0].formatted_address,
          isGeocodingError: false,
          position:{
            latitude:results[0].geometry.location.lat(),
            longitude:results[0].geometry.location.lng(),
          }
        });
        console.log(this.state);

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    }.bind(this));
  }
    
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

  /*componentDidUpdate(prevProps) {
    // Clear form if going from edit to add message route
    if(prevProps.routes[1].path.substring(0,4) === "edit" && this.props.route.path === "add")
      this.props.initialize({})
  }*/

  render() {
    const { handleSubmit, pristine, reset, submitting, user, postEvents, showSnackbar } = this.props;
    const {userId} = user.userObject; 
    const {id} = this.props.homeGroupDetails.homeGroupDetails;

    const submitHandler = handleSubmit(
      newEventForm(
        reset, 
        userId, 
        this.state.isGeocodingError,
        this.state.foundAddress, 
        this.state.position, 
        id, 
        postEvents, 
        showSnackbar));

    return (
      <form onSubmit={ submitHandler }>
      <h1>{id ? 'Edit event' : 'New event'}</h1>

      {/*<div className="row center-xs">
        <div className="col-xs-11 col-md-8">
          <Field name="imageUpload" component={ImageUpload}/>
        </div>
      </div>*/}

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
      <div className='col-xs-8 col-md-4'>
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
      <div className='col-xs-8 col-md-4'>
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
      {/*<GoogleMap
	    bootstrapURLKeys = {{key:process.env.GOOGLE_MAP_APIKEY}}
      defaultCenter={this.props.center}
      defaultZoom={this.props.zoom}></GoogleMap>*/}
      <div>
      {
        this.state.isGeocodingError 
        ? 
        <p className="bg-danger">Address not found.</p>
        :
        <p className="bg-info">{this.state.foundAddress}</p>
      }
      </div>
      <div className="map" ref={this.setMapElementReference}></div>

      <div className="row center-xs">
        <div className="col-xs-11 col-md-8">
          {/*<Field name="address" component={TextField} fullWidth={true}
          floatingLabelText="Address" floatingLabelStyle={{left: 0}}
          errorStyle={{textAlign: "left"}}
          multiLine={false} />*/}
          <TextField ref={this.setSearchInputElementReference} hintText="Enter Location"/>
          <RaisedButton label="Find Location"
          labelStyle={{fontSize:"1.2rem"}} style={{margin: "2vh 0 5vh", width: "50%"}}
          disabled={submitting} primary={true}
          onTouchTap={()=>{
            this.geocodeAddress(this.searchInputElement.refs.component.input.value);
          }}
          />
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