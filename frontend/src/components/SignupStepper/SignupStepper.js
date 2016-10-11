import React, { PropTypes }from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { LinkButton } from '../Link';
import Axios from 'axios';

import Step1 from '../SignupStepper/Step1';
import Step2 from '../SignupStepper/Step2';
import Step3 from '../SignupStepper/Step3';

var formFields = {
  displayName: null,
  gender: null, 
  homeUniName: null,
  emailDomain: null,
  exchangeUniName: null,
  exchangeUniYear: null,
  exchangeUniName: null,
  exchangeTerm: null,
}

export default class SignupStepper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      // stepIndex: 2,
      isEmailSent: false,
      authEmailError: null,
      fetching: true,
    };
  }

  handleNext(callback) {
    const { stepIndex } = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex + 1 >= 2,
    });
  }

  handlePrev(callback) {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  saveData(callback, data) {
    if (!!data.displayName) {
      formFields.displayName = data.displayName;
    }
    if (!!data.gender) {
      formFields.gender = data.gender;
    }
    if (!!data.homeUniName) {
      formFields.homeUniName = data.homeUniName;
      this.findHomeUniEmainDomain(formFields.homeUniName);
    }
    if (!!data.exchangeUniName) {
      formFields.exchangeUniName = data.exchangeUniName;
    }
    if (!!data.exchangeUniYear) {
      formFields.exchangeUniYear = data.exchangeUniYear;
    }
    if (!!data.exchangeTerm) {
      formFields.exchangeTerm = data.exchangeTerm;
    }
    if (this.state.finished) {
      console.log("send registration email!");
      var self = this;
      // set a dummy url and data here -> later need to replace with the correct one
      Axios.get("http://localhost:3001/verificationemail").then(function(res) {
          if (!self.unmounted && res.data.success)
            self.setState({isEmailSent: true, fetching: false});
      }).catch(function(res) {
          if (!self.unmounted) 
            self.setState({authEmailError: res.data, fetching: false});
      });
    }
  }

  findHomeUniEmainDomain(uniName) {
    console.log(uniName);
    console.log(this.props.universitiesList.universities);
    const allUniList = this.props.universitiesList.universities;
    for (var i=0; i<allUniList.length; i++) {
      console.log(allUniList[i].name);
      if (allUniList[i].name === uniName) {
        formFields.emailDomain = allUniList[i].emailDomains;
      }
    }
  }

  componentDidMount() {
    if (this.props.hasJoinedGroup)
      this.setState({ stepIndex: 2 });
    this.props.fetchAllUniversities();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { universities, error, loading } = this.props.universitiesList;

    if (loading) {
      return <div>Loading</div>
    }

    return (
        <Stepper activeStep={ this.state.stepIndex } orientation="vertical">
          <Step>
            <StepLabel>Complete your profile</StepLabel>
            <StepContent>
              <Step1
                saveData = { this.saveData.bind(this, null) }
                handleNext = { this.handleNext.bind(this) }
                universities = { this.props.universitiesList.universities } />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select your exchange university</StepLabel>
            <StepContent>
              <Step2
                saveData = { this.saveData.bind(this, null) }
                handlePrev = { this.handlePrev.bind(this) }
                handleNext = { this.handleNext.bind(this) }
                universities = { this.props.universitiesList.universities } />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Verify your email</StepLabel>
            <StepContent>
              <Step3
                saveData = { this.saveData.bind(this, null) }
                handlePrev = { this.handlePrev.bind(this) }
                universityName = { formFields.homeUniName }
                emailDomains = { formFields.emailDomain }
                isEmailSent = { this.state.isEmailSent }
                fetching = { this.state.fetching }
                authEmailError = { this.state.authEmailError }
                 />
            </StepContent>
          </Step>
        </Stepper>
    );
  }
}

SignupStepper.propTypes = {
  universitiesList: PropTypes.object.isRequired
}