import moment from 'moment';
import { get, post } from './api';
import Lockr from 'lockr';

export const getUserToken = () => {
  return Lockr.get('session/userToken') || '';
};

// Simple assumption that the existence of a session variable means logged in
// so this method may return false positives. We must verify the token at the
// start of the app run, and log out the user if the token is invalid.

export const isUserLoggedIn = () => {
  const userToken = Lockr.get('session/userToken');
  const userTokenExpiresAt = Lockr.get('session/userTokenExpiresAt');

  if (!userToken || !userToken.length || !userTokenExpiresAt)
    return false;
  else if (moment(userTokenExpiresAt).isBefore(moment()))
    return false;
  else
    return true;
};

export const verifyToken = (cb) => {
  const userToken = getUserToken();

  if (!isUserLoggedIn())
    return cb(false);

  get('/test/token', { token: userToken }, {}, function(res) {
    const { valid } = res.body;
    if (!valid)
      return cb(false);
    else
      return cb(true);
  });
};

export const setSession = (token, cb) => {
  Lockr.set('session/userToken', token);
  Lockr.set('session/userTokenExpiresAt', moment().add(14, 'd'));

  cb && cb();
};

export const setSessionFacebookLogin = (accessToken, cb) => {
  post('/auth/facebook', { access_token: accessToken }, { userToken: false }, function(res) {
    try {
      const { token: userToken, user } = res.body;

      setSession(userToken, () => {
        if (cb)
          cb(user);
      });
    } catch (exc) {
      console.error('Could not set session: ' + exc);
    }
  });
};

export const clearSession = () => {
  Lockr.rm('session/userToken');
  Lockr.rm('session/userTokenExpiresAt');
};
