import React from 'react';
import './AvatarWithBadges.scss';

const AvatarWithBadges = ({ topBadge, bottomBadge, avatar, ...rest }) => (
  <div className="avatar-with-badge" { ...rest }>
    { topBadge && 
      <div className="badge top">
        { topBadge }
      </div>
    }
    { bottomBadge && 
      <div className="badge bottom">
        { bottomBadge }
      </div>
    }
    { avatar }
  </div>
);

AvatarWithBadges.propTypes = {
  topBadge: React.PropTypes.node,
  bottomBadge: React.PropTypes.node,
  avatar: React.PropTypes.node,
};

export default AvatarWithBadges;