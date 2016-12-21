import React from 'react';
import GroupFeedPost from './GroupFeedPost';
import { groupPropType, userPropType, feedPostPropType } from 'util/propTypes';

import './GroupFeed.scss';

const GroupFeed = ({ group, feedPosts }) => (
  <div className ="group-feed">
    { feedPosts.map((feedPost, idx) => <GroupFeedPost key={ idx } feedPost={ feedPost } group={ group } />) }
  </div>
);

GroupFeed.propTypes = {
  group: groupPropType.isRequired,
  feedPosts: React.PropTypes.arrayOf(feedPostPropType).isRequired,
  user: userPropType,
};

export default GroupFeed;