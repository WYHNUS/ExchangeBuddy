import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { browserHistory } from 'react-router'
import request from 'superagent'
import { TextField, Toggle } from 'redux-form-material-ui'
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton'
//import ImageUpload from '../ImageUpload/index.js'
import validUrl from 'valid-url'

const handler = (passSnackbarMessage, user, location, dropId) => values => {
  
  if(dropId){
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
      /*socketHandler.post({
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
      });*/
      browserHistory.push('/drops')
    });
  }

}

const validate = values => {
  const errors = {};
  const requiredFields = [ 'title' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  const urlFields = [ 'soundCloudUrl', 'videoUrl' ];
  urlFields.forEach(field => {
    const str = values[field];
    if(str && str.length > 0 && !validUrl.isUri(str)){
      errors[ field ] = 'Invalid Link'
    }
  })

  return errors;
}


class NewEventForm extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {

    const {drops, profileDrops, selectedDrop} = this.props;
    //this.clickedDrop = selectedDrop.selectedDropSrc === "profile" ? profileDrops[selectedDrop.selectedDropIdx] : null;

    if(this.props.route.path === "add"){
      this.props.initialize({});

    }else if(this.clickedDrop){
      console.log(this.clickedDrop)
      this.clickedDrop.emojiUni = ':'+EmojiUniToAnnotation[this.clickedDrop.emojiUni]+':';
      this.props.initialize(this.clickedDrop);

    } else{
      request
      .get('/api/feeds/'+this.props.params.dropId)
      .end((err,res) => {
        const emojiName = EmojiUniToAnnotation[res.body.emojiUni];
        res.body.emojiUni = ':'+emojiName+':';
        this.props.initialize(res.body);
      })
    }
  }

  componentDidUpdate(prevProps) {
    // Clear form if going from edit to add message route
    if(prevProps.routes[1].path.substring(0,4) === "edit" && this.props.route.path === "add")
      this.props.initialize({})
  }

  render() {
    const { handleSubmit, pristine, passSnackbarMessage, submitting, dropId, user, location } = this.props;

    return (
      <form onSubmit={ handleSubmit(handler(passSnackbarMessage, socketHandler, user, location, dropId)) }>
      <h1>{dropId ? 'Edit message' : 'New message'}</h1>

      <div className="row center-xs">
        <div className="col-xs-10">
          <Field name="emojiUni" component={EmojiInput} hintText="Choose Emoji"/>
          <Field name="title" component={TextField} fullWidth={true}
          floatingLabelText="Write Message" floatingLabelStyle={{left: 0}}
          errorStyle={{textAlign: "left"}}
          multiLine={true} rows={2}/>
          </div>
          <div className="col-xs-12"><h3>Other Options</h3></div>
          <div className="col-xs-10">
          {/*<Field name="imageId" component={ImageUpload} />*/}
        </div>

        <div className="col-xs-12">
          <RaisedButton type="submit" label="Submit"
          labelStyle={{fontSize:"1.2rem"}} style={{margin: "2vh 0 5vh", width: "50%"}}
          disabled={pristine || submitting} primary={true}
          />
        </div>
        </div>
      </form>
    )
  }
}

// Decorate with redux-form
NewEventForm = reduxForm({
  form: 'newEventForm',
  validate
})(NewEventForm)

/*AddForm.PropTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}*/

export default NewEventForm;