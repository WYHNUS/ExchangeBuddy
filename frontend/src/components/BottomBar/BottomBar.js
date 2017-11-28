import React from 'react';
import { browserHistory } from 'react-router';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Icon from 'components/Icon';

import { makeMenuItems } from 'components/TopBar/TopBar';

import * as Colors from 'material-ui/styles/colors';
import { palette } from 'layouts/MuiTheme';

const getCurrentMenuItemIndex = (user, currentPath) => makeMenuItems(user).filter(item => !item.admin).map(item => item.to).indexOf('/' + currentPath.split('/')[1]);

const BottomBar = ({ user, currentPath }) => (
  <Paper zDepth={1} className="bottom-navigation">
    <BottomNavigation>
      { makeMenuItems(user).map((item, idx) => {
          if (item.admin) 
            return null;

          const iconColor = getCurrentMenuItemIndex(user, currentPath) + 1 === idx ? palette.primary1Color : Colors.grey400;

          return (
            <BottomNavigationItem 
              key={ idx } 
              icon={ 
                item.icon 
                ? <Icon name={ item.icon } size={24} color={ iconColor } /> 
                : item.avatar
              }
              onClick={ () => browserHistory.push(item.to) } /> 
          );
        } ).filter(x => x) }
    </BottomNavigation>

  </Paper>
);

BottomBar.propTypes = {
  currentPath: React.PropTypes.string.isRequired,
  user: React.PropTypes.object,
};

export default BottomBar;
