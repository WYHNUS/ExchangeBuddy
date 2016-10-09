import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

//import SignupStepper from '../components/SignupStepper';
/*import * as ImagesHelper from '../../util/images';*/

const Signup = () => (
  <Row className="page-signup">
    <Col md={6} xs={0} className="signup-left">
      {/*<img src={ ImagesHelper.getUrlScale(Meteor.settings.public.stepperImageId, 500) } id="stepper-img"/>*/}
    </Col>
    <Col md={5} xs={12} className="signup-right">
      <h1>Complete your profile</h1>
      {/*<SignupStepper/>*/}
    </Col>
  </Row>
);

export default Signup;