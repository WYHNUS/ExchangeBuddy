import React from 'react';

import { Router, Route, Redirect, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadState } from './util/localStorage';
import configureStore from './store/configureStore';

/** ROUTES **/

// Layout
import App from './layouts/App';
import Home from './layouts/Home';
import AppShell from './layouts/AppShell';
import AppShellWithBackButton from './layouts/AppShellWithBackButton';
import AppShellWithoutBottomBar from './layouts/AppShellWithoutBottomBar';
import AppShellPlainWithoutBottomBar from './layouts/AppShellPlainWithoutBottomBar';
import AdminAppShell from './layouts/AdminAppShell';

import Events from './pages/Home/Events';
import Chat from './pages/Home/Chat';
import Friends from './pages/Home/Friends';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Wiki from './pages/Wiki/Wiki';
import WikiDetails from './pages/Wiki/WikiDetails';
import Stories from './pages/Stories/Stories';
import StoryDetails from './pages/Stories/Story';
import EditStory from './pages/EditStory';
import NotLoggedIn from './pages/NotLoggedIn';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Verify from './pages/Verify';
import IdentifyUniversity from './pages/IdentifyUniversity';
import EditUniversity from './pages/EditUniversity';
import Settings from './pages/Settings';
import NewEvent from './pages/Home/NewEvent';
import ProfileEdit from './pages/ProfileEdit';
import AdminHome from './pages/Admin/AdminHome';

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
        pathname: '/notLoggedIn'
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
      <IndexRoute component={ Landing } />

      <Route path="signup" component={ Signup } />
      <Route path="login" component={ Login } />
      <Route path="verify/:token" component={ Verify } />

      <Route path="home" onEnter={ authRequired } component={ Home }>
        <IndexRoute onEnter={ goToDefaultGroup } />

        <Route path=":id">
          <IndexRoute component={ Friends } />
          <Route path="events">
            <IndexRoute component={ Events } />
            <Route path="new" component={ NewEvent } />
          </Route>
          <Route path="chat" component={ Chat } />
          <Route path="friends" component={ Friends } />
        </Route>

        <Redirect path="*" to="home" />
      </Route>
      
      <Route component={ AppShellPlainWithoutBottomBar }>
        <Route path="identifyUniversity" component={ IdentifyUniversity } />
      </Route>

      <Route path="profile" onEnter={ authRequired }>
        <IndexRedirect to="profile/me" />
        
        <Route path="me">
          <Route component={ AppShell }>
            <IndexRoute component={ Profile } />
          </Route>

          <Route component={ AppShellWithBackButton }>
            <Route path="edit" component={ ProfileEdit } />
            <Route path="editUni" component={ EditUniversity } />
          </Route>
        </Route>

        <Route component={ AppShellWithBackButton }>
          <Route path=":userId" component={ Profile } />
        </Route>
      </Route>
      
      <Route path="stories">
        <Route component={ AppShell }>
          <IndexRoute component={ Stories } />
        </Route>
        
        <Route component={ AppShellWithBackButton }>
          {/*<Route path="newstory" component={ EditStory } onEnter={ authRequired } />*/}
          <Route path=":storyId" component={ StoryDetails } />
        </Route>
      </Route>

      <Route path="wiki">
        <Route component={ AppShell }>
          <IndexRoute component={ Wiki } />
        </Route>
        
        <Route component={ AppShellWithBackButton }>
          <Route path=":wikiTitle" component={ WikiDetails } />
        </Route>
      </Route>
      
      <Route component={ AppShellWithoutBottomBar }>
        <Route path="settings" component={ Settings } />
      </Route>
      
      <Route path="admin" component={ AdminAppShell }>
        <IndexRoute component={ AdminHome } />
      </Route>


      <Route component={ AppShellPlainWithoutBottomBar }>
        <Route path="notLoggedIn" component={ NotLoggedIn } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Route>
  );
}

export default (
  <Provider store={ store }>
    <Router history={ history } onUpdate={ logPageView }>
      { getRoutes(store) }
    </Router>
  </Provider>
);