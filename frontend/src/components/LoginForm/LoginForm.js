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
    errors['userEmail'] = 'That doesn\'t look like an email address :o';
  }
  
  return errors;
};

class LoginForm extends React.Component {
  componentDidUpdate() {
    const { isLoggedIn, isAuthenticated, token } = this.props.userAuthData;
    
    if (isLoggedIn && isAuthenticated && token){
      browserHistory.push('/home');
    }
  }

  render() {
    const { handleSubmit, submitting, loginError } = this.props;

    return (
      <div>
        <div className="social-network-wrapper">
          <div>
            <FacebookLogin
              appId="580995375434079"
              scope="public_profile"
              fields="name, email"
              callback={ responseFacebook(this.props.attemptFacebookLogin) }
              cssClass="facebook-login-button"
              textButton= "Continue with Facebook"
              icon="fa-facebook fa-1x" />
          </div>
        </div>

        <p className="line-seperator" style={{ marginTop: 20 }}> or </p>

        <form onSubmit={ handleSubmit((values) => {
          this.submitForm(values)
        }) }>
          <EmailFormField
            name="userEmail"
            floatingLabelText="Your email address" />

          <PasswordFormField
            name="userPassword" floatingLabelText="Your password" />

          <div className="row" style={{ marginTop: 18 }}>
            <div className="info-container-col signup-button-container">
              <RaisedButton className="raised-btn" label="Continue" primary type="submit" style={{ width: '100%' }}/>
            </div>
          </div>
        </form>

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

  submitForm(val) {
    this.props.attemptLogin(val);
  }

}

// Decorate with redux-form
export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);