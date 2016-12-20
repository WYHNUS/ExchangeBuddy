import React from 'react';
import { browserHistory } from 'react-router';

import IconButton from 'material-ui/IconButton';
import Icon from 'components/Icon';
import AppBar from 'material-ui/AppBar';

import { isUserAdmin } from 'util/user';
import * as Colors from 'material-ui/styles/colors';

export const menuItems = [
  { label: 'Admin Area', icon: 'fa fa-wrench', to: '/admin', admin: true },
  { label: 'Your Exchange Group', icon: 'fa fa-users', to: '/group' },
  { label: 'WikiExchange', icon: 'fa fa-graduation-cap', to: '/wiki' },
  { label: 'ExchangeAnswers', icon: 'fa fa-comments', to: '/qna' },
  { label: 'Stories', icon: 'fa fa-newspaper-o', to: '/stories' },
];

const TopBar = ({ user }) => (
  <AppBar 
    className="topbar" 
    showMenuIconButton={false} 
    title={
      <div className="container">
        <div className="row">
          <div className="col col-xs-12 col-sm-6 center-xs start-sm">
            <Icon name="fa fa-globe" color={ Colors.grey50 } size={28} /> ExchangeBuddy
          </div>
          <div className="col col-xs-6 end-xs hidden-xs">
            <div className="menu-items">
              { menuItems.map((item, idx) => {
                  if (item.admin && !isUserAdmin(user))
                    return null;

                  return (
                    <IconButton 
                      key={ idx } 
                      onClick={ () => browserHistory.push(item.to) } 
                      tooltip={ item.label } 
                      tooltipStyles={{ fontWeight: 400, fontSize: 12 }}>
                      <Icon name={ item.icon } size={20} color={ Colors.grey50 } />
                    </IconButton>
                  );
                }) }
            </div>
          </div>
        </div>
      </div>
    }
    titleStyle={{ fontWeight: 100, fontSize: 28, overflow: 'visible' }} />
);

TopBar.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default TopBar;
