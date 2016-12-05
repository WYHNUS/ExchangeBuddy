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
      'back-btn': this.props.pageVisibility.topBarSettingsButton,
      'app-bar': true,
    });

    const { topBarVisibility } = this.props.pageVisibility;

    if (!topBarVisibility)
      return null;

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
    const { topBarSettingsButton, topBarBackButtonVisibility } = this.props.pageVisibility;

    if (topBarSettingsButton && !topBarBackButtonVisibility) {
      return (
        <IconButton onClick={ () => browserHistory.push('/settings') }>
          <Icon name="settings" color={ Colors.grey900 } />
        </IconButton>
      );
    } else if (!topBarSettingsButton && topBarBackButtonVisibility) {
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
    const { homeSearchDrawerOpenButtonVisibility } = this.props.pageVisibility;

    if (homeSearchDrawerOpenButtonVisibility) {
      return (
        <FlatButton
          label="Groups"
          labelStyle={{ color: Colors.grey900 }}
          onClick={ () => this.props.toggleHomeSearchDrawerVisibility(true) } />
      );
    } else {
      return <div style={{ marginLeft: 44, marginRight: 44, marginTop: 24,  marginBottom: 24 }}></div>;
    }
  }
}

TopBar.propTypes = {
  pageVisibility: React.PropTypes.object.isRequired
};

export default TopBar;
