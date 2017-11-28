import React from 'react';
import { browserHistory } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import SignupForm from 'components/Authentication/SignupForm';
import Paper from 'components/Paper';

import logoImageSrc from 'assets/ExchangeBuddySpreadIcon.png';

import 'components/Authentication/Authentication.scss';

export default () => (
  <div className="page-sign-flow container">
    <div className="row center-xs">
      <div className="col-xs-12 col-sm-6 col-md-5">
        <Paper>
          <div className="row center-xs">
            <div className="col-xs-10">
              <div className="signup-logo">
                <img src={ logoImageSrc } />
              </div>

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
          </div>
        </Paper>
      </div>
    </div>
  </div>
);