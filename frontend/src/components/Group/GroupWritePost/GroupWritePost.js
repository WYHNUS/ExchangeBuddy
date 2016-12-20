import React from 'react';

import Paper from 'material-ui/Paper';

import { groupPropType, userPropType } from 'util/propTypes';

const GroupWritePost = () => (
  <Paper>
    Say something to your fellow exchangers!
  </Paper>
);

GroupWritePost.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupWritePost;