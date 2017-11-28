import React from 'react';
import { browserHistory } from 'react-router';

export default class NotLoggedIn extends React.Component {
  componentDidMount() {
    this.redirect();
  }

  render() {
    return (
      <div id="not-logged-in-text-container">
        <p>You are not logged in.</p>
        <p>Redirecting back to home...</p>
      </div>
    );
  }

  redirect() {
    setTimeout(function() {
      browserHistory.push('/');
    }, 2000);
  }
}