import React from 'react';
import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import IconMenu from 'material-ui/IconMenu';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { MenuItem } from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';

import { formatRelaTime } from 'util/helper';
import { getAvatarUrl } from 'util/user';
import { userPropType } from 'util/propTypes';

import './GroupFeedPostHeader.scss';

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

export default class GroupFeedPostCommentCardHeader extends React.PureComponent {
  static propTypes = {
    user: userPropType.isRequired,
    author: userPropType.isRequired,
    content: React.PropTypes.string.isRequired, 
    createdAt: React.PropTypes.instanceOf(Date).isRequired,
    afterContent: React.PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      isDeleteConfirmationDialogOpen: false,
    };

    this.openDeleteConfirmationDialog = this.openDeleteConfirmationDialog.bind(this);
    this.closeDeleteConfirmationDialog = this.closeDeleteConfirmationDialog.bind(this);
    this.editFeedPost = this.editFeedPost.bind(this);
    this.stopEditingFeedPost = this.stopEditingFeedPost.bind(this);
  }

  render() {
    const { user, author, content, createdAt, afterContent } = this.props;

    return (
      <AvatarRow 
        avatar={ getAvatarUrl(author) } 
        size={30}
        valign="top"
        rightIcon={
          user && user.id === author.id &&
          <IconMenu iconButtonElement={ <IconButton><Icon name="keyboard_arrow_down" size={16} /></IconButton> }>
            <MenuItem className="post-dropdown-menuitem" primaryText="Edit" onClick={ this.editFeedPost } />
            <MenuItem className="post-dropdown-menuitem" primaryText="Delete" onClick={ this.openDeleteConfirmationDialog } />
          </IconMenu>
        }>
        <PostCommentInfo name={ author.name } timestamp={ createdAt } />
        <PostCommentContent 
          content={ content } 
          afterContent={ afterContent } />
      </AvatarRow>
    );
  }

  openDeleteConfirmationDialog() {
    this.setState({ isDeleteConfirmationDialogOpen: true });
  }

  closeDeleteConfirmationDialog() {
    this.setState({ isDeleteConfirmationDialogOpen: false });
  }

  editFeedPost() {
    this.setState({ isEditing: true });
  }

  stopEditingFeedPost() {
    this.setState({ isEditing: false });
  }
}