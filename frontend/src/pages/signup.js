import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import SignupForm from '../components/SignupForm';
import ExchangeBuddySpreadIcon from '../res/ExchangeBuddySpreadIcon.png';

// import { Grid, Row, Col } from 'react-flexbox-grid';
// import SignupStepper from '../components/SignupStepper';
/*import * as ImagesHelper from '../../util/images';*/

// const Signup = () => (
//   <Row className="page-signup">
//     <Col md={6} xs={0} className="signup-left">
//       {/*<img src={ ImagesHelper.getUrlScale(Meteor.settings.public.stepperImageId, 500) } id="stepper-img"/>*/}
//     </Col>
//     <Col md={5} xs={12} className="signup-right">
//       <h1>Complete your profile</h1>
//       {<SignupStepper/>}
//     </Col>
//   </Row>
// );

class Signup extends React.Component {
  render() {
    return(
      <div className="page-sign-flow">
        <div className="hide-text"></div>
        <div className="sign-flow-nav-tab">
          <RaisedButton
            primary={true}
            label="Signup"
            className="sign-flow-nav-button disabled" />
          <RaisedButton
            label="Login"
            onTouchTap={ () => browserHistory.push('/login')}
            className="sign-flow-nav-button enabled" />
        </div>

        <div className="signup-form">
          <SignupForm/>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state)=>{
  return {
    user: state.user.userObject
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);