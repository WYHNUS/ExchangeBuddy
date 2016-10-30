// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers/rootReducer';
import { saveState } from '../util/localStorage';

export default function configureStore(initialState) {
  const middewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
  ];

  const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/rootReducer', () => {
      const nextReducer = require('../reducers/rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  store.subscribe(throttle(() => {
    saveState({
      user: {
        token: store.getState().user.token,
        userObject: store.getState().user.userObject,
        signupInfo: {
          displayName: '',
          email: '',
          password: ''
        }
      },
      stories: store.getState().stories
    });
  }, 1000));

  return store;
}