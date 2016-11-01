import React from 'react';

import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadState } from './util/localStorage';
import configureStore from './store/configureStore';

/** ROUTES **/

// Layout
import App from './layouts/app';
import Home from './layouts/home';

import Events from './pages/home/events';
import Chat from './pages/home/chat';
import Friends from './pages/home/friends';
import Landing from './pages/landing';
import NotFound from './pages/not-found';
import Profile from './pages/profile';
import Wiki from './pages/wiki';
import Stories from './pages/stories/stories';
import StoryDetails from './pages/stories/story';
import EditStory from './pages/editStory';
import NotLoggedIn from './pages/notloggedin';
import Signup from './pages/signup';
import Login from './pages/login';
import Verify from './pages/verify';
import IdentifyUniversity from './pages/identifyUniversity';
import Settings from './pages/settings';
import NewEvent from './pages/home/newevent';
import ProfileEdit from './pages/profileEdit';

// Redux
const persistedState = loadState();
const store = configureStore(persistedState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// add GA
var ReactGA = require('react-ga');
ReactGA.initialize(process.env.GA_ID);
 
function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export const getRoutes = (store) =>{
  const authRequired = (nextState, replace) => {
    // Now you can access the store object here.
    const state = store.getState();

    if (!state.user.token) {
      replace({ 
        pathname: '/notloggedin'
      });
    } else if (!state.user.userObject.UniversityId) {
      replace({ 
        pathname: '/identifyUniversity'
      });
    }
  };

  const goToDefaultGroup = (nextState, replace)=>{
    // Now you can access the store object here.
    const state = store.getState();
    replace({
      pathname: '/home/default', //should be state.user.defaultGroupId
      state: { nextPathname: nextState.location.pathname }
    });
  }

  return(
  <Route path="/" component={ App }>
    <IndexRoute component={ Landing }/>
    <Route path="home" onEnter={ authRequired }>
      <IndexRoute onEnter={ goToDefaultGroup }/>
      <Route path=":id" component={ Home }> 
        <IndexRoute component={ Friends }/>
        <Route path="events">
          <IndexRoute component={ Events }/>
          <Route path="new" component={ NewEvent }/>
        </Route>
        <Route path="chat" component={ Chat }/>
        <Route path="friends" component={ Friends }/>
      </Route>
    </Route>
    {/*<Route path="newstory" component={ EditStory } onEnter={ authRequired }/>*/}
    <Route path="stories" onEnter={ authRequired }>
      <IndexRoute component={ Stories }/>
      <Route path=":storyId" component={ StoryDetails }/>
    </Route>
    <Route path="wiki" component={Wiki}/>
    <Route path="profile(/:userId)" onEnter={ authRequired }>
      <IndexRoute component={Profile}/>
      <Route path="edit" component={ProfileEdit}/>
    </Route>
    <Route path="notloggedin" component={ NotLoggedIn }/>
    <Route path="signup" component={ Signup }/>
    <Route path="login" component={ Login }/>
    <Route path="verify">
      <Route path=":token" component={ Verify }/>
    </Route>
    <Route path="identifyUniversity" component={ IdentifyUniversity }/>
    <Route path='settings' component={ Settings }/>
    <Route path="*" component={ NotFound }/>
  </Route>
  );
}

export default (
      <Provider store={ store }>
        <Router history={ history } onUpdate={ logPageView } >
          { getRoutes(store) }
        </Router>
      </Provider>
);