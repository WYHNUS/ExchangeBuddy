import React from 'react';

import Paper from 'material-ui/Paper';

import { groupPropType, userPropType } from 'util/propTypes';

const GroupMembers = () => (
  <Paper>
    Exchangers in this group (0)
  </Paper>
);

GroupMembers.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupMembers;