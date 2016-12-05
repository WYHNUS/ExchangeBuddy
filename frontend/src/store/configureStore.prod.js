import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from 'reducers/rootReducer';
import { saveState } from 'util/localStorage';

export default function configureStore(initialState) {
  const middewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunkMiddleware,
  ];

  const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middewares)
    )
  );

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
      utilityInfo: store.getState().utilityInfo,
      stories: store.getState().stories
    });
  }, 1000));

  return store;
}
