import React from 'react';
import { browserHistory } from 'react-router';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Icon from 'components/Icon';

import { menuItems } from 'components/TopBar/TopBar';

const getCurrentMenuItemIndex = (currentPath) => menuItems.filter(item => !item.admin).map(item => item.to).indexOf(currentPath);

const BottomBar = ({ currentPath }) => (
  <Paper zDepth={1} className="bottom-navigation">
    <BottomNavigation selectedIndex={ getCurrentMenuItemIndex(currentPath) }>
      { menuItems.map((item, idx) => {
          if (item.admin) 
            return null;

          return (
            <BottomNavigationItem key={ idx } onClick={ () => browserHistory.push(item.to) } icon={ <Icon name={ item.icon } size={24} /> } />
          );
        } ).filter(x => !!x) }
    </BottomNavigation>

  </Paper>
);

BottomBar.propTypes = {
  currentPath: React.PropTypes.string.isRequired,
};

export default BottomBar;
