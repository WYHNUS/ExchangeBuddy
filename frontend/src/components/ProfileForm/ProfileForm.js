import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { browserHistory } from 'react-router';
import { TextField, Toggle} from 'redux-form-material-ui';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
var Dropzone = require('react-dropzone');

import { TextFormField } from '../Field';
import { PasswordFormField } from '../Field';

import { ROOT_URL } from '../../util/backend';
import { bearer } from '../../util/bearer';
import request from 'superagent';

const FILE_FIELD_NAME = 'files'; 

const uploadFile=(data)=>{
  console.log('called superagent file request');
  const formData = new FormData();
  formData.append('file',data.files[0]);
  console.log(formData);
  var req = request
    .post(ROOT_URL + '/uploadProfile')
    .send(formData)
    /*.attach(data.files[0].name,data.files[0])
    .type("multipart/form-data")*/
    .use(bearer)
    .end((err,res)=>{
      console.log(err,res);
      if (res.status === 401) {
        //cookie.remove('authToken');
        //this.props.clearUser();
        // need to redirect to a new version of login page
        browserHistory.push('/');
      } 

      if (!err && !res.error){
        console.log('uploaded');
      } else {
        console.log('server error');
      }
    })
};

const profileForm=(callback, editProfile, userId)=>(values)=>{
  console.log(values);
  callback();
  if(values.files.length>0){
    uploadFile(values)  
  }
  editProfile(values.userName, values.userPassword);

	browserHistory.push('/profile/me');
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

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class ProfileForm extends Component {
  
  state = {
    files: []
  };

  onDrop(acceptedFiles) {
    this.setState({
        files: acceptedFiles
    });
  }

  onOpenClick () {
    this.dropzone.open();
  }


	render() {
		const { handleSubmit, pristine, reset, submitting, userObject, editProfile } = this.props;

    const submitHandler = handleSubmit(profileForm(reset, editProfile, userObject.id));

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

          <div className="row center-xs">
          <Field
            name={FILE_FIELD_NAME}
            component={renderDropzoneInput}/>
          </div>

          <div className="row center-xs" style={{marginTop: "18px"}}>
            <div className="info-container-col signup-button-container">
              <RaisedButton className="raised-btn" disabled={pristine || submitting}
              label="Submit Changes" primary={true} type="submit" style={{ width: "100%" }}/>
            </div>
          </div>

          {/*<Field
            type="file"
            name="poster"
            component={FileInput}
          />*/}

          {/*<input
            type="file"
            onChange={
              ( e ) => {      
                e.preventDefault();
                const { fields } = this.props;
                // convert files to an array
                const files = [ ...e.target.files ];
                fields.yourField.handleChange(files);
              }
            }
          />*/}

    			</form>

          {/*<form action={`${ROOT_URL}/uploadProfile`}
          method='post'
          encType='multipart/form-data'>
          <input type='file' name='profilePicture'/>
          <button type='submit' > submit </button>
          </form>*/}

          </div>
          </div>
    		)
  }
}

class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    const { input: { value } } = this.props

    return (<input
      type="file"
      value={value}
      onChange={this.onChange}
    />)
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