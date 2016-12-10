import React from 'react';
import { PromiseState } from 'react-refetch';

import { List, ListItem } from 'material-ui/List';

import { formatDateTime } from 'util/helper';

const VersionItem = ({ createdAt, userId }) => (
  <ListItem
    primaryText={ `${userId || 'First version'}` }
    secondaryText={ `Updated on ${formatDateTime(createdAt)}` } />
);

VersionItem.propTypes = {
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  userId: React.PropTypes.number.isRequired,
};

const WikiHistoryDialogList = ({ versions, handleSelectVersion }) => (
  <List>
    { versions.map((version, idx) => <VersionItem key={ idx } createdAt={ version.createdAt } userId={ version.UserId } />) }
  </List>
);

WikiHistoryDialogList.propTypes = {
  versions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  handleSelectVersion: React.PropTypes.func.isRequired,
};

export default WikiHistoryDialogList;