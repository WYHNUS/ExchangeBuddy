import React from 'react';
import Paper from 'components/Paper';
import AvatarRow from 'components/AvatarRow';

import { getAvatarUrl } from 'util/user';
import { userPropType } from 'util/propTypes';

import './ProfileHeader.scss';

const ProfileHeader = ({ user }) => (
  <Paper className="profile-header">
    <div className="container">
      <div className="profile-details row">
        <div className="col-xs-12">
          <AvatarRow avatar={ getAvatarUrl(user, 80) } size={80} transparent collapse>
            <h1>{ user.name }</h1>
            <h4>{ user.university.name }</h4>
          </AvatarRow>
        </div>
      </div>
    </div>
  </Paper>
);

ProfileHeader.propTypes = {
  user: userPropType,
};

export default ProfileHeader;