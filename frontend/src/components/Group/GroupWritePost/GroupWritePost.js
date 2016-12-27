import React from 'react';

import Paper from 'components/Paper';
import GroupWritePostForm from './GroupWritePostForm';

import { groupPropType } from 'util/propTypes';

const GroupWritePost = ({ group }) => (
  <Paper>
    <GroupWritePostForm group={ group } />
  </Paper>
);

GroupWritePost.propTypes = {
  group: groupPropType.isRequired,
};

export default GroupWritePost;