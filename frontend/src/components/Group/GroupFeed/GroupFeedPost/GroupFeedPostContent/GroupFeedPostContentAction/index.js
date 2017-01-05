import React from 'react';
import Icon from 'components/Icon';

import * as Colors from 'material-ui/styles/colors';

const GroupFeedPostContentAction = ({ icon, onClick, primaryText, isSubmit=false }) => (
  <div className="action" onClick={ onClick }>
    { isSubmit && <button type="submit" style={{ display: 'none' }} /> }
    <Icon name={ icon } size={16} color={ Colors.grey400 } /> { primaryText }
  </div>
);

GroupFeedPostContentAction.propTypes = {
  icon: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  primaryText: React.PropTypes.string.isRequired,
  isSubmit: React.PropTypes.bool,
};

export default GroupFeedPostContentAction;