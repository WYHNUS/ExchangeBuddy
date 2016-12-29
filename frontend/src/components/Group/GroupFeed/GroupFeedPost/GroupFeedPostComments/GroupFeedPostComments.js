import React from 'react';
import GroupFeedPostComment from '../GroupFeedPostComment';
import GroupFeedPostWriteComment from '../GroupFeedPostWriteComment';

import { groupPropType, userPropType, feedPostCommentPropType, feedPostPropType } from 'util/propTypes';

import './GroupFeedPostComments.scss';

const GroupFeedPostComments = ({ feedComments, group, feedPost, refreshComments }) => (
  <div className="comments-main-container">
    { feedComments.map((comment, idx) => (
      <GroupFeedPostComment key={ idx } feedComment={ comment } group={ group } feedPost={ feedPost } />
      )) }
    <GroupFeedPostWriteComment feedPost={ feedPost } refreshComments={ refreshComments } />
  </div>
);

GroupFeedPostComments.propTypes = {
  feedComments: React.PropTypes.arrayOf(feedPostCommentPropType).isRequired,
  feedPost: feedPostPropType.isRequired,
  group: groupPropType.isRequired,
  user: userPropType,
  refreshComments: React.PropTypes.func.isRequired,
};

export default GroupFeedPostComments;