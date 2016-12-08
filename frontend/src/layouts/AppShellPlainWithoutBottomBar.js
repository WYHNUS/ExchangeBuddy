import React from 'react';
import TopBar from 'components/TopBar';

const AppShellPlainWithoutBottomBar = ({ children }) => (
  <div className="app-container">
    <TopBar />

    { children }
  </div>
);

AppShellPlainWithoutBottomBar.propTypes = {
  children: React.PropTypes.node,
};

export default AppShellPlainWithoutBottomBar;