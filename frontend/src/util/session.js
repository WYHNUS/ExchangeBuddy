import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

export const setUserSession = (user, token) => {
  Session.setPersistent("currentUserToken", token);
  Session.setPersistent("currentUser", user);
};

export const clearUserSession = () => {
  Session.setPersistent("currentUser", null);
  Session.setPersistent("currentUserToken", null);
};

// Called at Meteor.startup
export const setCurrentUser = (callback = () => {}) => {
  // Let Meteor.user get from session variable
  Meteor.user = () => Session.get("currentUser");
  Meteor.userId = () => Session.get("currentUser") && Session.get("currentUser").id;
  Meteor.userToken = () => Session.get("currentUserToken");

  verifyCurrentUser((error, user) => {
    // Clear session variable if we cannot verify the user.
    if (error || !user) {
      clearUserSession();
      return callback(false);
    }

    // Set session variable (in case not already set)
    Session.setPersistent("currentUser", user);

    // Continue with the rest of loading
    return callback(true);
  });
};

// Used at Meteor.startup
const verifyCurrentUser = (callback) => {
  const sessionUser = Session.get("currentUser");
  const sessionUserToken = Session.get("currentUserToken");

  if (!sessionUser || !sessionUserToken)
    return callback(null, null);

  Meteor.call('User.get', sessionUser.id, (error, user) => {
    if (error)
      return callback(error, null);
    else if (!user)
      return callback(null, null);

    Meteor.call('User.verifyToken', sessionUserToken, (error, verified) => {
      if (error)
        return callback(error, null);
      else if (!verified)
        return callback(null, null);
      else
        return callback(null, user);
    });
  });
};

// Handles log out actions
export const handleLogout = (callback) => {
  // Clear user sessions
  clearUserSession();

  // Go to main page
  browserHistory.push('/');

  if (callback)
    callback();
};
