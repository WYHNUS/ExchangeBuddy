import React from 'react';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileExchanges from './ProfileExchanges';

import { userPropType } from 'util/propTypes';

import './Profile.scss';

const Profile = ({ user }) => (
  <div className="profile-page">
    <div className="container">
      <div className="profile-header-container">
        <ProfileHeader user={ user } />
      </div>
      
      <div className="row">
        <div className="col-xs-12 col-sm-4">
          <div className="row">
            <div className="col-xs">
              <ProfileAbout user={ user } />
            </div>
          </div>
          <div className="row">
            <div className="col-xs">
              <ProfileExchanges user={ user } />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Profile.propTypes = {
  user: userPropType,
};

export default Profile;