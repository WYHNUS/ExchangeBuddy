import React from 'react';
import Avatar from 'material-ui/Avatar';

import './AvatarRow.scss';

const AvatarRow = ({ avatar, className, avatarStyle, bodyStyle, size=40, children, ...rest }) => (
  <div className={`avatarrow ${ className || '' }`} { ...rest }>
    <div className="avatar" style={{ width: size }}>
      <Avatar src={ avatar } size={ size } style={{ objectFit: 'cover', ...avatarStyle }} />
    </div>
    <div className="body" style={ bodyStyle }>
      { children }
    </div>
  </div>
);

AvatarRow.propTypes = {
  avatar: React.PropTypes.string,
  size: React.PropTypes.number,
  className: React.PropTypes.string,
  avatarStyle: React.PropTypes.object,
  bodyStyle: React.PropTypes.object,
  children: React.PropTypes.node.isRequired,
};

export default AvatarRow;
