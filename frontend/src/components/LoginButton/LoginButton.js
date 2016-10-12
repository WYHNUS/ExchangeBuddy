import React from 'react';
import { browserHistory } from 'react-router';

import FacebookLogin from 'react-facebook-login';
//import { setUserSession } from '../../../util/session';

const responseFacebook = (actions) => (response) => {
  if (!response || !response.userID)
    return;
  browserHistory.push('/signup');

  /*Meteor.call('User.loginFacebook', response, (error, { user, token }) => {
    if (error || !user || !token) {
      if (error)
        console.log("Error in invoking User.loginFacebook: " + error);

      actions.showSnackbar("Could not login to Facebook.");
    } else {
      setUserSession(user, token);
      browserHistory.push('/signup');

      // Temp
      actions.showSnackbar("Logged in!");
    }
  })*/
};

const LoginButton = ({ actions }) => (
  <FacebookLogin
    appId={ "580995375434079" }
    scope="public_profile,email,user_education_history,user_location"
    fields="name,email,picture,gender,education,location,accessToken"
    callback={ responseFacebook(actions) } />
);

export default LoginButton;
