import React from 'react';

import Paper from 'components/Paper';
import GroupWritePostForm from './GroupWritePostForm';

import { groupPropType, userPropType } from 'util/propTypes';

const GroupWritePost = () => (
  <Paper>
    <GroupWritePostForm />
  </Paper>
);

GroupWritePost.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupWritePost;