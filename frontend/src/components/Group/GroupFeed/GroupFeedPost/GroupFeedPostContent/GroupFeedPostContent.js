import React from 'react';

import AvatarRow from 'components/AvatarRow';

import GroupFeedPostContentAction from './GroupFeedPostContentAction';

import { formatRelaTime } from 'util/helper';
import { getAvatarUrl } from 'util/user';
import { userPropType } from 'util/propTypes';

import './GroupFeedPostContent.scss';

const PostCommentContent = ({ content, afterContent }) => (
  <div className="comment-reply-content">
    <div className="comment-reply-content-body">{ content }</div> 
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

export default class GroupFeedPostContent extends React.PureComponent {
  static propTypes = {
    user: userPropType.isRequired,
    author: userPropType.isRequired,
    content: React.PropTypes.string.isRequired, 
    createdAt: React.PropTypes.instanceOf(Date).isRequired,
    commentActions: React.PropTypes.node,
    handleClickEdit: React.PropTypes.func.isRequired,
    handleClickDelete: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { user, author, content, createdAt, commentActions, handleClickEdit, handleClickDelete } = this.props;
    const isUserAuthor = user && author && user.id === author.id;

    return (
      <AvatarRow 
        avatar={ getAvatarUrl(author) } 
        size={30}
        valign="top">
        <PostCommentInfo name={ author.name } timestamp={ createdAt } />
        <PostCommentContent 
          content={ content } 
          afterContent={
            <div className="comment-actions">
              { commentActions }
              { isUserAuthor && <GroupFeedPostContentAction icon="edit" primaryText="Edit" onClick={ handleClickEdit } /> }
              { isUserAuthor && <GroupFeedPostContentAction icon="delete" primaryText="Delete" onClick={ handleClickDelete } /> }
            </div>
          } />
      </AvatarRow>
    );
  }
}