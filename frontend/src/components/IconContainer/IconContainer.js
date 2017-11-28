import React from 'react';
import Icon from 'components/Icon';

import * as Colors from 'material-ui/styles/colors';
import './IconContainer.scss';

const ErrorComponent = ({ icon, title, subtitle }) => (
  <div className="icon-container">
    <Icon name={ icon } size={60} color={ Colors.grey500 } />
    <h1>{ title }</h1>
    { subtitle && <p>{ subtitle }</p> }
  </div>
);

ErrorComponent.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string,
};

export default ErrorComponent;