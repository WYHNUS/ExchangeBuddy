import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import Browser from './Browser';
import HomeSearchDrawer from './HomeSearchDrawer';
import MessageSnackbar from './MessageSnackbar';

const rootReducer = combineReducers({
  ...Browser,
  ...HomeSearchDrawer,
  ...MessageSnackbar,

  // Add routerReducer
  routing: routerReducer,

  // Add formReducer
  form: formReducer,
});

export default rootReducer;