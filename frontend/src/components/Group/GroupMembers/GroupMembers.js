import React from 'react';

import Paper from 'components/Paper';
import { List, ListItem } from 'material-ui/List';

import { groupPropType, userPropType } from 'util/propTypes';
import { getAvatar } from 'util/user';

const GroupMembers = ({ group: { users } }) => (
  <Paper>
    <h4 className="subheader">Exchangers in this group ({ users.length })</h4>
    <List>
      { users.map((user, idx) => (
        <ListItem 
          key={ idx } 
          primaryText={ user.name } 
          secondaryText={ user.university.name }
          leftAvatar={ getAvatar(user, 40) } />
      )) }
    </List>
  </Paper>
);

GroupMembers.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupMembers;