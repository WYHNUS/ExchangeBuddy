import React from 'react';

import { List, ListItem } from 'material-ui/List';

import { formatRelaTime } from 'util/helper';
import { getAvatar } from 'util/user';

const VersionItem = ({ createdAt, user, onClick, isLatestVersion }) => (
  <ListItem
    primaryText={ `${user && user.name || 'First version'}` + (isLatestVersion ? ' (latest version)' : '') }
    leftAvatar={ getAvatar(user, 40) }
    secondaryText={ `Updated ${formatRelaTime(createdAt)}` }
    onClick={ onClick } />
);

VersionItem.propTypes = {
  createdAt: React.PropTypes.string.isRequired,
  user: React.PropTypes.object,
  handleSelectVersion: React.PropTypes.func.isRequired,
  isLatestVersion: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

const WikiHistoryDialogList = ({ versions, handleSelectVersion }) => (
  <List>
    { versions.map((version, idx) => 
        <VersionItem key={ idx } createdAt={ version.createdAt } user={ version.User } onClick={ handleSelectVersion(version.versionNumber) } isLatestVersion={ !idx } />
      ) }
  </List>
);

WikiHistoryDialogList.propTypes = {
  versions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  handleSelectVersion: React.PropTypes.func.isRequired,
};

export default WikiHistoryDialogList;