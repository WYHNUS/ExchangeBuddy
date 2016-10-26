import React, { PropTypes }from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { LinkButton } from '../Link';

import Step1 from '../SignupStepper/Step1';
import Step2 from '../SignupStepper/Step2';
import Step3 from '../SignupStepper/Step3';

export default class SignupStepper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
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
                handleNext = { this.handleNext.bind(this) }
                universities = { universities } />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Select your exchange university</StepLabel>
            <StepContent>
              <Step2
                handlePrev = { this.handlePrev.bind(this) }
                handleNext = { this.handleNext.bind(this) }
                universities = { universities } />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Verify your email</StepLabel>
            <StepContent>
              <Step3
                handlePrev = { this.handlePrev.bind(this) }
                universities = { universities } />
            </StepContent>
          </Step>
        </Stepper>
    );
  }
}

SignupStepper.propTypes = {
  universitiesList: PropTypes.object.isRequired
}