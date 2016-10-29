import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';

import { EmailFormField } from '../Field';
import { PasswordFormField } from '../Field';


const responseFacebook = (attemptFacebookLogin) => (response) => {attemptFacebookLogin(response.accessToken)};

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'userEmail', 'userPassword' ];
  const { userEmail, userPassword } = values;
  
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if (!userEmail || !userEmail.length) {
    errors['userEmail'] = 'Required'
  } else if (!validator.isEmail(userEmail)) {
    errors['userEmail'] = 'Not valid email';
  }
  
  return errors;
};

class LoginForm extends React.Component {
  submitForm(val) {
    this.props.attemptLogin(val);
  }

  componentDidUpdate() {
    const { isLoggedIn, isAuthenticated, token } = this.props.userAuthData;
    
    if (isLoggedIn && isAuthenticated && token){
      browserHistory.push('/home');
    }
  }

  render() {
    const { handleSubmit, submitting, loginError } = this.props;
    const { isLoggedIn, isAuthenticated, isRegistered } = this.props.userAuthData;

    return (
      <div>
        <form onSubmit={ handleSubmit((values) => {
          this.submitForm(values)
        }) }>
          <EmailFormField
            name="userEmail"
            floatingLabelText="Your email address" />

          <PasswordFormField
            name="userPassword" floatingLabelText="Your password" />

          <div className="row" style={{marginTop: "18px"}}>
            <div className="info-container-col signup-button-container">
              <RaisedButton className="raised-btn" label="Submit" primary={true} type="submit" style={{ width: "100%" }}/>
            </div>
          </div>
        </form>

        <div className="social-network-wrapper">
          <div style={{marginRight: 40}}><p>Social Network Login :</p></div>
          <div><FacebookLogin
            appId={ "580995375434079" }
            scope="public_profile"
            fields="name, email"
            callback={ responseFacebook(this.props.attemptFacebookLogin) }
            cssClass="facebook-login-button"
            textButton= ""
            icon="fa-facebook" 
          /></div>
        </div>

        { submitting ? <p>Logging in... Please be patient. :)</p> : null }

        { 
          loginError ? 
            loginError.error ?
              <p>{ loginError.error }</p> 
            : <p>{ loginError }</p> 
          : null
        }
      </div>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);