import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

// Reducers
import { messageSnackbar } from './messageSnackbar';
import { browserIsMobileWidth } from './browser';
import { pageVisibility } from './pageVisibility';
import { home } from './home';
import { user } from './user';
import { utilityInfo } from './utilityInfo';
import {profile} from './profile';
import {stories} from './stories';
import {homeSearchGroups} from './homeSearchGroups';

const rootReducer = combineReducers({
  messageSnackbar,
  browserIsMobileWidth,
  pageVisibility,
  home,
  user,
  utilityInfo,
  profile,
  stories,
  homeSearchGroups,

  // Add routerReducer
  routing: routerReducer,

  // Add formReducer
  form: formReducer,
});

export default rootReducer;