import React from 'react';

import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import { formatRelaTime } from 'util/helper';
import { getAvatarUrl } from 'util/user';
import { userPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
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
    avatarSize: React.PropTypes.number,
    commentActions: React.PropTypes.node,
    handleClickEdit: React.PropTypes.func.isRequired,
    handleClickDelete: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    avatarSize: 30,
  };

  render() {
    const { user, author, content, avatarSize, createdAt, commentActions, handleClickEdit, handleClickDelete } = this.props;
    const isUserAuthor = user && author && user.id === author.id;

    return (
      <AvatarRow 
        avatar={ getAvatarUrl(author) }
        bodyStyle={{ paddingLeft: 0 }}
        size={ avatarSize }
        valign="top"
        rightIcon={
          <IconMenu iconButtonElement={ <IconButton><Icon name="more_horiz" size={16} color={ Colors.grey500 } /></IconButton> }>
            { isUserAuthor && 
              <MenuItem className="post-dropdown-menuitem" primaryText="Edit" onClick={ handleClickEdit } /> }
            { isUserAuthor && 
              <MenuItem className="post-dropdown-menuitem" primaryText="Delete" onClick={ handleClickDelete } /> }
          </IconMenu>
        }>
        <PostCommentInfo name={ author.name } timestamp={ createdAt } />
        <PostCommentContent 
          content={ content } 
          afterContent={ <div className="comment-actions">{ commentActions }</div> } />
      </AvatarRow>
    );
  }
}