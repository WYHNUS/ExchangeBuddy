import React from 'react';
import { browserHistory } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import LoginForm from 'components/Authentication/LoginForm';
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
                <FlatButton label="Signup" onTouchTap={ () => browserHistory.push('/signup')} className="sign-flow-nav-button" />
                <FlatButton primary label="Login" className="sign-flow-nav-button" />
              </div>

              <div className="signin-form">
                <LoginForm/>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  </div>
);