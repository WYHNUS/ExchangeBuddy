import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import Browser from './Browser';
import HomeSearchDrawer from './HomeSearchDrawer';

// Refactor the rest soon
import { messageSnackbar } from './messageSnackbar';
import { home } from './home';
import { user } from './user';
import { utilityInfo } from './utilityInfo';
import { profile } from './profile';
import { stories } from './stories';
import { wiki } from './wiki';
import { homeSearchGroups } from './homeSearchGroups';

const rootReducer = combineReducers({
  ...Browser,
  ...HomeSearchDrawer,
  messageSnackbar,
  home,
  user,
  utilityInfo,
  profile,
  stories,
  wiki,
  homeSearchGroups,

  // Add routerReducer
  routing: routerReducer,

  // Add formReducer
  form: formReducer,
});

export default rootReducer;