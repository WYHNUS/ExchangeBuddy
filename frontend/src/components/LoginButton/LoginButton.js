import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import FacebookLogin from 'react-facebook-login';
//import { setUserSession } from '../../../util/session';

const responseFacebook = (attemptLogin) => (response) => {attemptLogin(response.accessToken)};
  // if (!response || !response.userID)
  //   return;

  // attemptLogin(response.accessToken);
  // .then(function(res) {
  //   console.log(res);
  // }, function(err) {
  //   console.log(err);
  //   // browserHistory.push('/signup');
  // });

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
// };

// const LoginButton = ({ actions }) => (
export default class LoginButton extends Component {
  constructor(props){
    super(props);
    // this.goToProfileIfLoggedIn = this.goToProfileIfLoggedIn.bind(this);
  }

  render() {
    return (
      <FacebookLogin
        appId={ "580995375434079" }
        scope="public_profile, email, user_education_history, user_location"
        fields="name, email, picture, gender, education, location, accessToken"
        callback={ responseFacebook(this.props.attemptLogin) } />
    )
  }
// );
}

// export default LoginButton;
