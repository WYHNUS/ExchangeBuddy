import React from 'react';

import Paper from 'components/Paper';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';

import { formatMonth } from 'util/helper';
import { userPropType } from 'util/propTypes';

import './ProfileExchanges.scss';

const ProfileExchanges = ({ user }) => (
  <Paper>
    <div className="row profile-exchanges">
      <div className="col-xs">
        <h4 className="subheader">Exchange Programmes</h4>

        <List>
          { user.exchanges.map((exchange, idx) => (
              <ListItem
                key={ idx }
                primaryText={ exchange.university.name }
                secondaryText={ `${ formatMonth(exchange.month) } ${ exchange.year }` }
                leftAvatar={ <Avatar src={ exchange.university.logoImageUrl } /> } />
            )) }
        </List>
      </div>
    </div>
  </Paper>
);

ProfileExchanges.propTypes = {
  user: userPropType.isRequired,
};

export default ProfileExchanges;