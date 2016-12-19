import React from 'react';
import { reduxForm, propTypes as reduxPropTypes } from 'redux-form';
import validator from 'validator';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLoginButton from 'components/FacebookLoginButton';

import { EmailFormField } from '../Field';
import { PasswordFormField } from '../Field';

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'userEmail', 'userPassword' ];
  const { userEmail } = values;
  
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
  
  return errors;
};

class LoginForm extends React.PureComponent {
  static propTypes = {
    ...reduxPropTypes
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="social-network-wrapper">
          <FacebookLoginButton />
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