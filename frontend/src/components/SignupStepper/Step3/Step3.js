import React from 'react';
import { reduxForm } from 'redux-form';
import validator from 'validator';

import { EmailFormField } from '../../Field';
import NextButton from '../NextButton';
import PrevButton from '../PrevButton';

export const fields = [ 'homeUniEmail' ];

// import * as SessionHelper from '../../../util/session';

let uniEmailDomains;

const validUniEmail = (value) => {
  if (!validator.isEmail(value))
    return false;

  const domain = value.substr(value.indexOf('@') + 1);

  // TEMP: If no emailDomains, then just allow any domain.
  if (!uniEmailDomains)
    return true;

  // Checks for valid email domains.
  // Subdomains of valid domains are considered valid.
  // e.g. valid domains = ['u.nus.edu', 'nus.edu.sg']
  //      xxx@comp.nus.edu.sg is considered valid

  return uniEmailDomains.some(emailDomain => {
    // Check for exact match first.
    if (domain === emailDomain)
      return true;

    // At this point we are checking for subdomains.
    if (domain.length <= emailDomain.length) // If the domain is too short it's definitely wrong
      return false;

    // If emailDomain is x chars long, we check the last x+1 characters.
    // Must be equal to '.' + emailDomain.
    const sliced = domain.slice(domain.length - emailDomain.length - 1);
    return sliced === '.' + emailDomain;
  });
};

const validate = (values) => {
  const errors = {};
  const { homeUniEmail } = values;

  if (!homeUniEmail || !homeUniEmail.length)
    errors['homeUniEmail'] = 'Required';
  else if (!validator.isEmail(homeUniEmail))
    errors['homeUniEmail'] = 'Not valid email';
  else if (!validUniEmail(homeUniEmail))
    errors['homeUniEmail'] = 'Please use your university\'s email address.';

  return errors;
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {emailDomains:[]};
  }

  componentDidMount() {
    if (this.props.homeUniName && this.props.universities) {
      var allUniList = this.props.universities;
      for (var i=0; i<allUniList.length; i++) {
        console.log(allUniList[i].name);
        if (allUniList[i].name === this.props.homeUniName) {
          this.state.emailDomains = ["u.nus.edu", "comp.nus.edu"];
        }
      }
    }
    uniEmailDomains = this.state.emailDomains;
  }

  submitForm (val) {
    console.log(val);
    this.props.saveData(val);
  }

  render() {
    const { handlePrev, handleSubmit, submitting } = this.props;
    const { homeUniName } = this.props;
    const { isEmailSent, fetching, authEmailError } = this.props;

    return (
      <form onSubmit={ handleSubmit((values) => {
        this.submitForm(values)
      }) }>

        <p style={{ fontSize: "15px" }}>To complete your registration, please enter your email address at <strong>{ homeUniName }</strong>.</p>
        <p style={{ fontSize: "15px" }}>We will be sending a verification email to confirm your place at the university.</p>

        { this.state.emailDomains ?
          <p className="small-text">Email domains allowed: { this.state.emailDomains.map(x => `@${x}`).join(', ') }</p> :
          null
        }

        <EmailFormField
          name="homeUniEmail"
          floatingLabelText="Your university email address" />

        { isEmailSent ? <p>Verification email sent!</p> : null }

        <div style={{ marginTop: 12 }}>
          <NextButton label="Send verification email" disabled={submitting} />
          <PrevButton onTouchTap={ handlePrev } label="Back" disabled={submitting} />
        </div>
      </form>
    );
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'signupStep3',
  validate//, fields
})(Step3);
