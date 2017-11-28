import React from 'react';
import BottomBar from 'components/BottomBar';
import TopBar from 'components/TopBar';

const AppShell = ({ children, location }) => (
  <div className="app-container">
    <TopBar />

    <div className="main-container">
      { children }
    </div>

    <BottomBar currentPath={ location.pathname } />
  </div>
);

AppShell.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};

export default AppShell;