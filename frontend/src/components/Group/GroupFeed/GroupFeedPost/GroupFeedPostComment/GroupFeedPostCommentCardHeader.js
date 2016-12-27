import React from 'react';
import { CardHeader } from 'material-ui/Card';

import { formatRelaTime } from 'util/helper';
import { getAvatar } from 'util/user';

import { userPropType } from 'util/propTypes';

const PostCommentContent = ({ content, afterContent }) => (
  <div className="comment-reply-content">
    <div>{ content }</div> 
    { afterContent || null }
  </div>
);

PostCommentContent.propTypes = {
  content: React.PropTypes.string.isRequired,
  afterContent: React.PropTypes.node,
};

const PostCommentInfo = ({ name, timestamp }) => (
  <span className="comment-info"> 
    <span className="comment-author-name">{ name }</span>
    <span className="timestamp">{ formatRelaTime(timestamp) }</span>
  </span>
)

PostCommentInfo.propTypes = {
  name: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.instanceOf(Date).isRequired,
};

const GroupFeedPostCommentCardHeader = ({ author, content, createdAt, afterContent }) => (
  <CardHeader
    title={ <PostCommentInfo name={ author.name } timestamp={ createdAt } /> }
    subtitle={ 
      <PostCommentContent 
        content={ content } 
        afterContent={ afterContent } /> 
    }
    avatar={ getAvatar(author, 30) } />
);

GroupFeedPostCommentCardHeader.propTypes = {
  author: userPropType.isRequired,
  content: React.PropTypes.string.isRequired, 
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  afterContent: React.PropTypes.node,
};

export default GroupFeedPostCommentCardHeader;