import { connect } from 'react-redux';
import { setCurrentUser } from 'actions/User';
import { showSnackbar } from 'actions/MessageSnackbar';

import { post } from 'util/api';
import { setSession } from 'util/session';
import { browserHistory } from 'react-router';

import ChildComponent from './FacebookLoginButton';

const mapDispatchToProps = (dispatch) => ({
  attemptFacebookLogin(token) {
    post('/authenticateOrCreateByFB', { facebookToken: token }, { userToken: false }, ({ body }) => {
      const { token: userToken, user } = body;

      try {
        setSession(userToken, () => {
          dispatch(setCurrentUser(user));
          dispatch(showSnackbar('Logged in!'));
          browserHistory.push('/home');
        });
      } catch (exc) {
        dispatch(showSnackbar('Could not log in: ' + exc));
      }
    });
  },
});

export default connect(null, mapDispatchToProps)(ChildComponent);
