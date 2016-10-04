import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import { messageSnackbar } from './messageSnackbar';
import { browserIsMobileWidth } from './browser';
import { switchGroupDialogOpen } from './switchGroupDialog';
import { pageVisibility } from './pageVisibility';
import { home } from './home';
import { user } from './user';

const rootReducer = combineReducers({
  messageSnackbar,
  browserIsMobileWidth,
  switchGroupDialogOpen,
  pageVisibility,
  home,
  user,

  // Add routerReducer
  routing: routerReducer,

  // Add formReducer
  form: formReducer,
});

export default rootReducer;