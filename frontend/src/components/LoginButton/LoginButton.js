import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import FacebookLogin from 'react-facebook-login';
//import { setUserSession } from '../../../util/session';

const responseFacebook = (attemptLogin) => (response) => {attemptLogin(response.accessToken)};

// const LoginButton = ({ actions }) => (
export default class LoginButton extends Component {
  constructor(props){
    super(props);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }

  redirectIfLoggedIn() {
    if (this.props.userAuthSession.isLoggedIn){
      browserHistory.push('/home');
    } else if (this.props.userAuthSession.error) {
      console.log(this.props.userAuthSession.isRegistered);
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
        scope="public_profile, email, user_education_history, user_location"
        fields="name, email, picture, gender, education, location, accessToken"
        callback={ responseFacebook(this.props.attemptLogin) } />
    )
  }
}

