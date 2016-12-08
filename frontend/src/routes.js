import React from 'react';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadState } from './util/localStorage';
import configureStore from './store/configureStore';

/** ROUTES **/

// Layout
import App from './layouts/App';
import Home from './layouts/Home';

import Events from './pages/Home/Events';
import Chat from './pages/Home/Chat';
import Friends from './pages/Home/Friends';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Wiki from './pages/Wiki/Wiki';
import WikiDetails from './pages/Wiki/WikiDetails';
import WikiHistory from './pages/Wiki/WikiHistory';
import EditWiki from './pages/Wiki/EditWiki';
import WikiNewSection from './pages/Wiki/WikiNewSection';
import Stories from './pages/Stories/Stories';
import StoryDetails from './pages/Stories/Story';
import EditStory from './pages/EditStory';
import NotLoggedIn from './pages/NotLoggedIn';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Verify from './pages/Verify';
import IdentifyUniversity from './pages/IdentifyUniversity';
import Settings from './pages/Settings';
import NewEvent from './pages/Home/NewEvent';
import ProfileEdit from './pages/ProfileEdit';

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
  //additionally, scroll to top
  window.scrollTo(0, 0);
}

export const getRoutes = (store) =>{
  const authRequired = (nextState, replace) => {
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

  const goToDefaultGroup = (nextState, replace) => {
    replace({
      pathname: '/home/default', //should be state.user.defaultGroupId
      state: { nextPathname: nextState.location.pathname }
    });
  };

  return (
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
      <Route path="stories">
        <IndexRoute component={ Stories }/>
        <Route path=":storyId" component={ StoryDetails }/>
      </Route>
      <Route path="wiki">
        <IndexRoute component={ Wiki }/>
        <Route path=":wikiTitle" component={ WikiDetails }/>
        <Route path="history(/:wikiTitle)/*" component={ WikiHistory }/>
        <Route path="editWiki(/:wikiTitle/:wikiSection)" component={ EditWiki } onEnter={ authRequired }/>
        <Route path="newSection(/:wikiTitle)" component={ WikiNewSection } onEnter={ authRequired }/>
      </Route>
      <Route path="profile(/:userId)" onEnter={ authRequired }>
        <IndexRoute component={ Profile }/>
        <Route path="edit" component={ ProfileEdit }/>
        <Route path="editUni" component={ IdentifyUniversity }/>
      </Route>
      <Route path="notloggedin" component={ NotLoggedIn }/>
      <Route path="signup" component={ Signup }/>
      <Route path="login" component={ Login }/>
      <Route path="verify">
        <Route path=":token" component={ Verify }/>
      </Route>
      <Route path="identifyUniversity" component={ IdentifyUniversity }/>
      <Route path="settings" component={ Settings }/>
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