import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import FacebookLogin from 'react-facebook-login';

const responseFacebook = (attemptLogin) => (response) => {attemptLogin(response.accessToken)};

export default class LoginButton extends Component {
  constructor(props){
    super(props);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  redirectIfLoggedIn() {
    if (this.props.userAuthSession.isLoggedIn && this.props.userAuthSession.token){
      browserHistory.push('/home');
    } else if (this.props.userAuthSession.error) {
      if (!this.props.userAuthSession.isRegistered) {
        browserHistory.push('/signup');
      }
    }
  }

  componentWillMount() {
    this.redirectIfLoggedIn();
  }
  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }
  componentWillUnmount() {
    this.props.navigatedAwayFromAuthFormPage();
  }

  render() {
    return (
      <FacebookLogin
        appId={ "580995375434079" }
        scope="public_profile, user_education_history, user_location"
        fields="name, email, picture, gender, education, location"
        callback={ responseFacebook(this.props.attemptLogin) } />
    )
  }
}

