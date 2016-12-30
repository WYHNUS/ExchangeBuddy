import React from 'react';

import Paper from 'components/Paper';
import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import Link from 'components/Link';

import { getAvatarUrl } from 'util/user';
import { userPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
import './ProfileHeader.scss';

const ProfileHeader = ({ user }) => (
  <Paper className="profile-header">
    <div className="container">
      <div className="profile-details row">
        <div className="col-xs-12">
          <AvatarRow avatar={ getAvatarUrl(user, 80) } size={80} transparent collapse>
            <h1>{ user.name }</h1>
            <h4>{ user.university && user.university.name }</h4>
            <div className="profile-links">
              { user.fbUserId && 
                <Link to={ `https://www.facebook.com/app_scoped_user_id/${ user.fbUserId }` }>
                  <Icon name="fa fa-facebook-square" color={ Colors.grey700 } />
                </Link>
              }
            </div>
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