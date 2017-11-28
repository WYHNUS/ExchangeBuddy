import React from 'react';
import { reduxForm, propTypes as reduxPropTypes } from 'redux-form';
import validator from 'validator';

import RaisedButton from 'material-ui/RaisedButton';
import FacebookLoginButton from 'components/FacebookLoginButton';
import { TextFormField, EmailFormField, PasswordFormField } from 'components/Field';

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'userName', 'userEmail', 'userPassword', 'userConfirmPassword' ];
  const { userEmail, userPassword, userConfirmPassword } = values;
  
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });

  if (!userEmail || !userEmail.length) {
    errors['userEmail'] = 'Required'
  } else if (!validator.isEmail(userEmail)) {
    errors['userEmail'] = 'That doesn\'t look like an email address...';
  }

  if (!!userPassword && !!userConfirmPassword) {
    if (userPassword.length < 8) {
      errors['userPassword'] = 'Secure password (at least 8 digits) is the new fashion!';
    } else if (userPassword !== userConfirmPassword) {
      errors['userConfirmPassword'] = 'Two passwords must match';
    }
  }
  
  return errors;
};

class SignupForm extends React.PureComponent {
  static propTypes = {
    ...reduxPropTypes
  };
  
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div>
        <div className="social-network-wrapper">
          <FacebookLoginButton />
        </div>

        <p className="line-seperator" style={{marginTop: 20}}> or </p>

        <form onSubmit={ handleSubmit((values) => {
          this.submitForm(values)
        }) }>
          <TextFormField name="userName" floatingLabelText="Name" />

          <EmailFormField
            name="userEmail"
            floatingLabelText="Email" />

          <PasswordFormField name="userPassword" floatingLabelText="Password" />
          <p className="small">Password must be more than 8 characters.</p>

          <PasswordFormField name="userConfirmPassword" floatingLabelText="Confirm password" />

          <div className="row" style={{marginTop: 18}}>
            <div className="info-container-col signup-button-container">
              <RaisedButton className="raised-btn" label="Continue" primary type="submit" style={{ width: '100%' }}/>
            </div>
          </div>
        </form>

        { submitting ? <p>Registering user. Please be patient. :)</p> : null }
      </div>
    );
  }

  submitForm(val) {
    this.props.submitSignupForm(val);
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'SignupForm',
  validate
})(SignupForm);