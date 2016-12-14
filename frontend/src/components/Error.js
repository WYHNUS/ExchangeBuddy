import React from 'react';
import Icon from 'components/Icon';

import * as Colors from 'material-ui/styles/colors';

const ErrorComponent = ({ error }) => (
  <div className="error-container" style={{ textAlign: 'center' }}>
    <Icon name="error" size={60} color={ Colors.grey500 } />
    <h1>An error occured</h1>
    <p>{ error.toString() || 'Please contact us to report this problem!' }</p>
  </div>
);

ErrorComponent.propTypes = {
  error: React.PropTypes.object,
};

export default ErrorComponent;