import React from 'react';
import { browserHistory } from 'react-router';

import { clearSession } from 'util/session';

export default class Logout extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { showSnackbar, setCurrentUser } = this.props.actions;

    // Clear user session
    clearSession();

    // Set user state
    setCurrentUser(null);

    // Show notif bar
    showSnackbar('Logged out.');

    // Redirect to home
    browserHistory.push('/');
  }

  render() {
    return null;
  }

}