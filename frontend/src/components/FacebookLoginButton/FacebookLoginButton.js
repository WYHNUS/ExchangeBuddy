import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ attemptFacebookLogin }) => (
  <FacebookLogin
    appId="580995375434079"
    scope="public_profile"
    fields="name, email"
    callback={ response => attemptFacebookLogin(response.accessToken) }
    cssClass="facebook-login-button"
    textButton= "Continue with Facebook"
    icon="fa-facebook fa-1x" />
);

FacebookLoginButton.propTypes = {
  attemptFacebookLogin: React.PropTypes.func.isRequired,
};

export default FacebookLoginButton;