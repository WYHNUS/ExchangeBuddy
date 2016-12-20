import React from 'react';

import Paper from 'material-ui/Paper';

import { groupPropType, userPropType } from 'util/propTypes';

const GroupFeed = () => (
  <Paper>
    Group feed
  </Paper>
);

GroupFeed.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupFeed;