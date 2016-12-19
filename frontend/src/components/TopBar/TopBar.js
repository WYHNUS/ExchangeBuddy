import React from 'react';

import AppBar from 'material-ui/AppBar';

class TopBar extends React.Component {
  render() {
    return (
      <AppBar
        title="ExchangeBuddy"
        style={{ textAlign: 'center' }}
        showMenuIconButton />
    );
  }
}

TopBar.propTypes = {
  showSettingsButton: React.PropTypes.bool,
  showHomeSearchDrawerOpenButton: React.PropTypes.bool,
  showBackButton: React.PropTypes.bool,
  toggleHomeSearchDrawer: React.PropTypes.func.isRequired,
};

export default TopBar;
