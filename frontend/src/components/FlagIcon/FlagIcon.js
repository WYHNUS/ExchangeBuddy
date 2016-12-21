import React from 'react';
import FlagIconFactory from 'react-flag-icon-css';

const FlagIconElement = FlagIconFactory(React, { useCssModules: false });

import './FlagIcon.scss';

export const FlagIcon = ({ code, ...props }) => (
  <FlagIconElement code={ code.toLowerCase() } { ...props } />
);

FlagIcon.propTypes = {
  code: React.PropTypes.string.isRequired,
};

export const FlagIconAvatar = ({ style, size=40, ...props }) => (
  <div className="flag-icon-avatar" style={{ width: size, height: size, ...style }}><FlagIcon size="5x" { ...props } /></div>
);

FlagIconAvatar.propTypes = {
  style: React.PropTypes.object,
  size: React.PropTypes.number,
};

export default FlagIcon;