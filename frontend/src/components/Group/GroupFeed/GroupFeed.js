import React from 'react';
import GroupFeedPost from './GroupFeedPost';
import GroupWritePost from 'components/Group/GroupWritePost';

import { groupPropType, userPropType, feedPostPropType } from 'util/propTypes';

import './GroupFeed.scss';

const GroupFeed = ({ group, feedPosts, refreshGroupFeed }) => (
  <div className="group-feed">
    <div className="row">
      <div className="col-xs">
        <GroupWritePost refreshGroupFeed={ refreshGroupFeed } group={ group } />
      </div>
    </div>
    <div className="row">
      <div className="col-xs">
        { feedPosts.map((feedPost, idx) => <GroupFeedPost key={ idx } feedPost={ feedPost } group={ group } />) }
      </div>
    </div>
  </div>
);

GroupFeed.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
  feedPosts: React.PropTypes.arrayOf(feedPostPropType).isRequired,
  refreshGroupFeed: React.PropTypes.func.isRequired,
};

export default GroupFeed;