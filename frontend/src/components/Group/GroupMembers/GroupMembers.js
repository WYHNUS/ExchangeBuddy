import React from 'react';

import Paper from 'components/Paper';
import { List, ListItem } from 'material-ui/List';

import { groupPropType, userPropType } from 'util/propTypes';
import { getBadgedAvatar } from 'util/user';
import FlagIcon from 'components/FlagIcon';

import './GroupMembers.scss';

const GroupMembers = ({ group: { users } }) => (
  <Paper>
    <h4 className="subheader">Exchangers in this group ({ users.length })</h4>
    <List>
      { users.map((user, idx) => (
        <ListItem
          key={ idx }
          primaryText={ user.name }
          secondaryText={ 
            <div>
              <span>{ user.university.name }</span><br />
              { user.homeCountry && 
                <span className="group-member-item-country">
                  <FlagIcon code={ user.homeCountry.alpha2Code } /> { user.homeCountry.name }
                </span>
              }
            </div>
          }
          secondaryTextLines={ user.homeCountry ? 2 : 1 }
          leftAvatar={ getBadgedAvatar(user, user.homeCountry, user.university, 40) } />
      )) }
    </List>
  </Paper>
);

GroupMembers.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupMembers;