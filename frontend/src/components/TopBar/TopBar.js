import React from 'react';
import { browserHistory } from 'react-router';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Icon from 'components/Icon';

import miniLogoSrc from 'static/ExchangeBuddyMini.png';
import * as Colors from 'material-ui/styles/colors';

class TopBar extends React.Component {
  render() {
    const appClass = classNames({
      'back-btn': this.props.showSettingsButton,
      'app-bar': true,
    });

    return (
      <AppBar
        className={ appClass }
        title={ <span id="app-title"><img src={ miniLogoSrc }/></span> }
        style={{ textAlign: 'center' }}
        iconElementLeft={ this.getIconElementLeft() }
        iconElementRight={ this.getIconElementRight() }
        showMenuIconButton />
    );
  }

  navigateBack() {
    browserHistory.goBack();
  }

  getIconElementLeft() {
    const { showSettingsButton, showBackButton } = this.props;

    if (showSettingsButton && !showBackButton) {
      return (
        <IconButton onClick={ () => browserHistory.push('/settings') }>
          <Icon name="settings" color={ Colors.grey900 } />
        </IconButton>
      );
    } else if (!showSettingsButton && showBackButton) {
      return (
        <IconButton onClick={ this.navigateBack }>
          <Icon name="chevron_left" color={ Colors.grey900 } />
        </IconButton>
      );
    } else {
      return <div style={{ margin: 24 }}></div>;
    }
  }

  getIconElementRight() {
    const { showHomeSearchDrawerOpenButton, toggleHomeSearchDrawer } = this.props;

    if (showHomeSearchDrawerOpenButton) {
      return (
        <FlatButton
          label="Groups"
          labelStyle={{ color: Colors.grey900 }}
          onClick={ () => toggleHomeSearchDrawer(true) } />
      );
    } else {
      return <div style={{ marginLeft: 44, marginRight: 44, marginTop: 24,  marginBottom: 24 }}></div>;
    }
  }
}

TopBar.propTypes = {
  showSettingsButton: React.PropTypes.bool,
  showHomeSearchDrawerOpenButton: React.PropTypes.bool,
  showBackButton: React.PropTypes.bool,
  toggleHomeSearchDrawer: React.PropTypes.func.isRequired,
};

export default TopBar;
