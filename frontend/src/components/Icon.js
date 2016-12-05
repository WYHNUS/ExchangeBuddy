import React from 'react';
import FontIcon from 'material-ui/FontIcon';

export const Icon = ({ name, color, style, size, ...rest }) => {
  const classes = name.split(' ');

  if (classes.indexOf('twa') >= 0)
    return <TwaIcon name={ name } style={ style } size={ size } { ...rest } />;
  else if (classes.indexOf('fa') >= 0)
    return <FaIcon name={ name } color={ color } style={ style } size={ size } { ...rest } />;
  else
    return <MaterialIcon name={ name } color={ color } size={ size } style={ style } { ...rest }/>;
};

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  size: React.PropTypes.number,
  style: React.PropTypes.object,
};

const FaIcon = ({ name, color, style, size, ...rest }) => (
  <i className={ name } style={{ width: size, height: size, fontSize: size, color, ...style }} { ...rest }></i>
);

FaIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  size: React.PropTypes.number,
  style: React.PropTypes.object,
};

const TwaIcon = ({ name, style, size, ...rest }) => (
  <i className={ name } style={{ width: size, height: size, backgroundSize: size, ...style }} { ...rest }></i>
);

TwaIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
  size: React.PropTypes.number,
  style: React.PropTypes.object,
};

const MaterialIcon = ({ name, color, size=24, style={}, className='' }) => (
  <FontIcon
    className={'material-icons ' + className}
    color={ color }
    style={{ fontSize: size, ...style }}>
    { name }
  </FontIcon>
);

MaterialIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  style: React.PropTypes.object,
  size: React.PropTypes.number,
};

export default Icon;
