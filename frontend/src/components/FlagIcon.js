import React from 'react';
import FlagIconFactory from 'react-flag-icon-css';

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

export const FlagIconAvatar = (props) => (
  <div className="flag-icon-avatar"><FlagIcon { ...props } /></div>
);

export default FlagIcon;