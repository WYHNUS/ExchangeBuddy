import React from 'react';
import TopBar from 'components/TopBar';

const AppShellWithoutBottomBar = ({ children }) => (
  <div className="app-container">
    <TopBar showBackButton />

    { children }
  </div>
);

AppShellWithoutBottomBar.propTypes = {
  children: React.PropTypes.node,
};

export default AppShellWithoutBottomBar;