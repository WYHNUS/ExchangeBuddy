import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory } from 'react-router';

import Loading from '../components/Loading';
import Link from '../components/Link';
import { Grid } from 'meteor/lifefilm:react-flexbox-grid';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../client/actions/snackbar';
import * as SessionHelper from '../../util/session';

class Verify extends React.Component {
  componentDidMount() {
    const self = this;

    Meteor.call('User.verifyEmailToken', this.props.params.token, (err, result) => {
      if (err || !result) {
        if (err)
          console.log(err);

        // Redirect to group
        browserHistory.push('/signup');
        this.props.actions.showSnackbar("Email verification failed. Please resend verification email.");
      } else {
        // Required so that Meteor.user() will reflect the new user information
        SessionHelper.setCurrentUser(() => {
          // Redirect to group
          browserHistory.push('/group');
          this.props.actions.showSnackbar("Email successfully verified.");
        });
      }
    });
  }

  render() {
    return <Loading />;
  }
}

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Verify);
