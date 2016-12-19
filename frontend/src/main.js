import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';

// Redux
import configureStore from 'store/configureStore';
import { loadState } from 'util/localStorage';
const persistedState = loadState();
const store = configureStore(persistedState);

// Run startup scripts
import './startup';

// Main SCSS import
import 'react-flexbox-grid';
import 'scss/application.scss';

// Retrieve user object
import { getUserProfile, clearSession } from 'util/session';
import { setCurrentUser } from 'actions/User';

// Get current user data and store in Redux store
function getCurrentUser(cb) {
  getUserProfile(function onSuccess(user) {
    store.dispatch(setCurrentUser(user));
    cb();
  }, function onError() {
    clearSession();
    cb();
  });
}

// Render the main component into the dom
getCurrentUser(() => {
  ReactDOM.render(<Router store={ store } />, document.getElementById('react-root'));
});
