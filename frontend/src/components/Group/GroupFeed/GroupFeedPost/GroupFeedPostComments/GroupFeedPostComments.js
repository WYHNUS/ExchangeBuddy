import React from 'react';
import GroupFeedPostComment from '../GroupFeedPostComment/GroupFeedPostComment';

import { groupPropType, userPropType, feedPostCommentPropType, feedPostPropType } from 'util/propTypes';

const GroupFeedPostComments = ({ feedComments, group, feedPost }) => (
  <div className="comments-main-container">
    { feedComments.map((comment, idx) => (
      <GroupFeedPostComment key={ idx } feedComment={ comment } group={ group } feedPost={ feedPost } />
      )) }
  </div>
);

GroupFeedPostComments.propTypes = {
  feedComments: React.PropTypes.arrayOf(feedPostCommentPropType).isRequired,
  feedPost: feedPostPropType.isRequired,
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupFeedPostComments;