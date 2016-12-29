import React from 'react';
import Icon from 'components/Icon';

import * as Colors from 'material-ui/styles/colors';

const GroupFeedPostContentAction = ({ icon, onClick, primaryText }) => (
  <div className="action" onClick={ onClick }>
    <Icon name={ icon } size={16} color={ Colors.grey400 } /> { primaryText }
  </div>
);

GroupFeedPostContentAction.propTypes = {
  icon: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  primaryText: React.PropTypes.string.isRequired,
};

export default GroupFeedPostContentAction;