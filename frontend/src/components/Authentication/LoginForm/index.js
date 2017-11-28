import { connect } from 'react-redux';
import { setCurrentUser } from 'actions/User';
import { showSnackbar } from 'actions/MessageSnackbar';

import { post } from 'util/api';
import { setSession } from 'util/session';

import ChildComponent from './LoginForm';

const mapStateToProps = () => ({
  initialValues: { 
    // TODO: To check if null initialValues has any effect.
    userEmail: null,
    userPassword: null,
  },
});

const mapDispatchToProps = (dispatch) => ({
  attemptFacebookLogin(token) {
    post('/authenticateOrCreateByFB', { facebookToken: token }, { userToken: false }, ({ body }) => {
      const { token: userToken, user } = body;

      try {
        setSession(userToken, () => {
          dispatch(setCurrentUser(user));
          dispatch(showSnackbar('Logged in!'));
        });
      } catch (exc) {
        dispatch(showSnackbar('Could not log in: ' + exc));
      }
    });
  },
});

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default LoginForm;