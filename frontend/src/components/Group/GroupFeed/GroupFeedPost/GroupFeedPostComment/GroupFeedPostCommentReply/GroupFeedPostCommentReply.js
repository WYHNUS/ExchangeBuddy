import React from 'react';
import Paper from 'components/Paper';
import GroupFeedPostCommentCardHeader from '../GroupFeedPostCommentCardHeader';

import { feedPostCommentReplyPropType } from 'util/propTypes';

import './GroupFeedPostCommentReply.scss';

const GroupFeedPostCommentReply = ({ feedCommentReply: { author, content, createdAt } }) => (
  <div className="row no-margin">
    <div className="col-xs-12">
      <Paper full>
        <GroupFeedPostCommentCardHeader author={ author } content={ content } createdAt={ createdAt } /> 
      </Paper>
    </div>
  </div>
);

GroupFeedPostCommentReply.propTypes = {
  feedCommentReply: feedPostCommentReplyPropType.isRequired,
};

export default GroupFeedPostCommentReply;
  