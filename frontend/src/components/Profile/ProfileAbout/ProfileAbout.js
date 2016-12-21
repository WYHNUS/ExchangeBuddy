import React from 'react';

import Paper from 'components/Paper';
import { FlagIconAvatar } from 'components/FlagIcon';
import { List, ListItem } from 'material-ui/List';

import { getFirstWord } from 'util/user';
import { getUniAvatar } from 'util/university';
import { userPropType } from 'util/propTypes';

import './ProfileAbout.scss';

const ProfileAbout = ({ user }) => (
  <Paper>
    <div className="row profile-exchanges">
      <div className="col-xs">
        <h4 className="subheader">About { getFirstWord(user) }</h4>

        <List>
          <ListItem
            primaryText={ user.university.name }
            secondaryText="Home university"
            leftAvatar={ getUniAvatar(user.university) } />
          <ListItem
            primaryText={ user.homeCountry.name }
            secondaryText="Country of origin"
            leftAvatar={ <FlagIconAvatar squared code={ user.homeCountry.alpha2Code } /> } />
        </List>

      </div>
    </div>
  </Paper>
);

ProfileAbout.propTypes = {
  user: userPropType.isRequired,
};

export default ProfileAbout;