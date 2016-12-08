import React from 'react';
import { browserHistory } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import SignupForm from 'components/SignupForm';

export default () => (
  <div className="page-sign-flow">
    <div className="hide-text"></div>
    <div className="sign-flow-nav-tab">
      <FlatButton
        primary
        label="Signup"
        className="sign-flow-nav-button" />
      <FlatButton
        label="Login"
        onTouchTap={ () => browserHistory.push('/login')}
        className="sign-flow-nav-button" />
    </div>

    <div className="signup-form">
      <SignupForm/>
    </div>
  </div>
);