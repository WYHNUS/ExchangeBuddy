import React from 'react';
import BottomBar from 'components/BottomBar';
import TopBar from 'components/TopBar';

const AppShell = ({ children }) => (
  <div className="app-container">
    <TopBar showBackButton showHomeSearchDrawerOpenButton onTouchTap={ () => this.props.toggleHomeSearchDrawerVisibility(false) } />

    { children }

    <BottomBar />
  </div>
);

AppShell.propTypes = {
  children: React.PropTypes.node,
};

export default AppShell;