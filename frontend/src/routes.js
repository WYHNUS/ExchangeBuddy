import React from 'react';

import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
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
import Stories from './pages/stories';
import Journal from './pages/journal';
import NotLoggedIn from './pages/notloggedin';
import Signup from './pages/signup';

// Redux
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export const getRoutes = (store) =>{

  const authRequired = (nextState, replaceState) => {
    // Now you can access the store object here.
    const state = store.getState();

    /*if (!state.user.isAuthenticated) {
      // Not authenticated, redirect to login.
      replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }*/
  };

  const goToDefaultGroup = (nextState, replace)=>{
    // Now you can access the store object here.
    const state = store.getState();
    replace({
      pathname: `/home/${state.home.homeGroupDetails.homeGroupDetails.id}`, //should be state.user.defaultGroupId
      state: { nextPathname: nextState.location.pathname }
    });
  }

  return(
  <Route path="/" component={ App }>
    <IndexRoute component={Landing}/>
    <Route path="home" onEnter={authRequired}>
      <IndexRoute onEnter={goToDefaultGroup}/>
      <Route path=":id" component={Home}> 
        <IndexRoute component={Events}/>
        <Route path="events" component={Events}/>
        <Route path="chat" component={Chat}/>
        <Route path="friends" component={Friends}/>
      </Route>
    </Route>
    <Route path="journal" component={Journal} onEnter={authRequired}/>
    <Route path="stories" component={Stories}/>
    <Route path="wiki" component={Wiki}/>
    <Route path="profile" component={Profile} onEnter={authRequired}/>
    <Route path="notloggedin" component={NotLoggedIn}/>
    <Route path="signup" component={Signup}/>
    <Route path="*" component={NotFound}/>
  </Route>
  );
}

export default (
      <Provider store={ store }>
        <Router history={ history }>
          { getRoutes(store) }
        </Router>
      </Provider>
);


//www.exchangebuddy.com/home/9134593223/events
//actual routing done this way
//<Route path="home">
//              <IndexRoute onEnter={goToDefaultGroup}/>
//              <Route path=":id" component={Home}>
//                <Route path="events" component={Events}/>
//                <Route path="chat" component={Chat}/>
//                <Route path="friends" component={Friends}/>
//              </Route>
//            </Route>

/*const goToDefaultGroup = (nextState, replace) => {
  // if (Meteor.user() && Meteor.user().defaultGroupId) {
  //   // If have default group, redirect there.
  //   replace({
  //     pathname: `/group/${Meteor.user().defaultGroupId}`,
  //     state: { nextPathname: nextState.location.pathname }
  //   });
  // } else {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
};*/

/*<Route path="wiki" component={Wiki}/>
            <Route path="journal" component={Journal}/>
            <Route path="stories" component={Stories}/>
            <Route path="profile" component={Profile}/>
            <Route path="settings" component={Settings}/>
            <Route path="*" component={NotFound}/>*/