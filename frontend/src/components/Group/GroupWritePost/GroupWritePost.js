import React from 'react';

import Paper from 'components/Paper';
import GroupWritePostForm from './GroupWritePostForm';

import { groupPropType } from 'util/propTypes';

const GroupWritePost = ({ group, refreshGroupFeed }) => (
  <Paper>
    <GroupWritePostForm group={ group } refreshGroupFeed={ refreshGroupFeed } />
  </Paper>
);

GroupWritePost.propTypes = {
  group: groupPropType.isRequired,
  refreshGroupFeed: React.PropTypes.func.isRequired,
};

export default GroupWritePost;