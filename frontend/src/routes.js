import React from 'react';

import { render } from 'react-dom';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import Store from './redux-store';

/** ROUTES **/

// Layout
import App from './layouts/app';

import Home from './pages/home';
import Landing from './pages/landing';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, Store);

export default (
      <Provider store={ Store }>
        <Router history={ history }>
          <Route path="/" component={ App }>
          	<IndexRoute component={Landing}/>
          	<Route path="home" component={Home}/>
          	
          </Route>
        </Router>
      </Provider>
      );

/*<Route path="wiki" component={Wiki}/>
            <Route path="journal" component={Journal}/>
            <Route path="stories" component={Stories}/>
            <Route path="profile" component={Profile}/>
            <Route path="settings" component={Settings}/>
            <Route path="*" component={NotFound}/>*/