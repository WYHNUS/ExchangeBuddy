import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import { messageSnackbarOpen, messageSnackbarMessage } from './messageSnackbar';
import { browserIsMobileWidth } from './browser';
import { switchGroupDialogOpen } from './switchGroupDialog';

const rootReducer = combineReducers({
  // Add more reducers here
  messageSnackbarOpen,
  messageSnackbarMessage,
  browserIsMobileWidth,
  switchGroupDialogOpen,

  // Add routerReducer
  routing: routerReducer,

  // Add formReducer
  form: formReducer,
});

export default rootReducer;
