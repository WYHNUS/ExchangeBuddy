import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export const icon = (className, style={}) => {
  if (className && className.substr(0,3) == "fa ")
    return <i className={ className } style={ style }></i>;
  else
    return materialIcon(className, style);
};

export const materialIcon = (name, style={}) => (
  <FontIcon
    className="material-icons"
    color={ style.color }
    style={ style }>
    { name }
  </FontIcon>
);