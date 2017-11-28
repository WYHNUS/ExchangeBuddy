import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import Browser from './Browser';
import HomeSearchDrawer from './HomeSearchDrawer';
import MessageSnackbar from './MessageSnackbar';
import User from './User';

const rootReducer = combineReducers({
  ...Browser,
  ...HomeSearchDrawer,
  ...MessageSnackbar,
  ...User,

  // Add routerReducer
  routing: routerReducer,

  // Add formReducer
  form: formReducer,
});

export default rootReducer;