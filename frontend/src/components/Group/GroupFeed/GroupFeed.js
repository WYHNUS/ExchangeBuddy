import React from 'react';
import GroupFeedPost from './GroupFeedPost/GroupFeedPost';
import Paper from 'components/Paper';

import { groupPropType, userPropType } from 'util/propTypes';

import './GroupFeed.scss';

const GroupFeed = ({group}) => (
  <div className ="group-feed">
    <GroupFeedPost group={ group } />
    <GroupFeedPost group={ group } />
  </div>
);

GroupFeed.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupFeed;