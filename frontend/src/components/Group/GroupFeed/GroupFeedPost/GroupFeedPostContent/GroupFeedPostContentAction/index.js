import React from 'react';
import Icon from 'components/Icon';
import IconButton from 'material-ui/IconButton';

import * as Colors from 'material-ui/styles/colors';

const GroupFeedPostContentAction = ({ icon, onClick, primaryText, isSubmit=false }) => (
  <div className="action" onClick={ onClick }>
    <IconButton className="action-icon-button" type={ isSubmit && 'submit' || null } style={{ padding: 0, height: 16, width: 16 }}>
      <Icon name={ icon } size={16} color={ Colors.grey400 } />
    </IconButton>
    <span className="action-label">{ primaryText }</span>
  </div>
);

GroupFeedPostContentAction.propTypes = {
  icon: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  primaryText: React.PropTypes.string.isRequired,
  isSubmit: React.PropTypes.bool,
};

export default GroupFeedPostContentAction;