import React from 'react';
import { browserHistory } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Icon from 'components/Icon';

import * as Colors from 'material-ui/styles/colors';

import miniLogoSrc from 'static/ExchangeBuddyMini.png';

const AdminAppShell = ({ children }) => (
  <div className="app-container admin-container">
    <AppBar
      className="app-bar"
      title={ <span id="app-title"><img src={ miniLogoSrc }/></span> }
      style={{ textAlign: 'center' }}
      iconElementLeft={ <IconButton><Icon name="home" color={ Colors.grey900 } /></IconButton> }
      onLeftIconButtonTouchTap={ () => browserHistory.push('/') }
      iconElementRight={ <IconButton><Icon name="dashboard" color={ Colors.grey900 } /></IconButton> }
      onRightIconButtonTouchTap={ () => browserHistory.push('/admin') } />

    { children }
  </div>
);

AdminAppShell.propTypes = {
  children: React.PropTypes.node,
};

export default AdminAppShell;