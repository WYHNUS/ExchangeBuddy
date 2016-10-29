import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import { EmailFormField } from '../Field';
import { PasswordFormField } from '../Field';

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
    console.log(val);
  }

  render() {
    const { handleSubmit, submitting, isLoggedIn, isAuthenticated, isRegistered, loginError } = this.props;

    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values)
      }) }>
        <EmailFormField
          name="userEmail"
          floatingLabelText="Your email address" />

        <PasswordFormField
          name="userPassword" floatingLabelText="Your password" />

        <div className="row center-md center-xs" style={{marginTop: "18px"}}>
          <div className="info-container-col">
            <RaisedButton className="raised-btn" label="Submit" primary={true} type="submit" style={{ margin: 6 }}/>
          </div>
        </div>

        { submitting ? <p>Logging in... Please be patient. :)</p> : null }

        { 
          (isRegistered && !isAuthenticated) ? 
          <div> 
            <p>Please check your inbox for verification!  </p>
          </div> 
          : null 
        }

        { loginError ? <p>{ loginError }</p> : null}
      </form>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);