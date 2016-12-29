import React from 'react';

import Paper from 'components/Paper';

import GroupFeedPostContent from '../GroupFeedPostContent';
import GroupFeedDeleteDialog from 'components/Group/GroupFeed/GroupFeedDeleteDialog';

import { feedPostCommentReplyPropType } from 'util/propTypes';

import './GroupFeedPostCommentReply.scss';

export default class GroupFeedPostCommentReply extends React.PureComponent {
  static propTypes = {
    feedCommentReply: feedPostCommentReplyPropType.isRequired,
    refreshComments: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isReplyBoxOpen: false,
      isDeleteConfirmationDialogOpen: false,
      isEditing: false,
    };

    this.expandReplies = this.expandReplies.bind(this);
    this.collapseReplies = this.collapseReplies.bind(this);
    this.toggleReplies = this.toggleReplies.bind(this);
    this.openReplyBox = this.openReplyBox.bind(this);
    this.closeReplyBox = this.closeReplyBox.bind(this);
    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.openDeleteConfirmationDialog = this.openDeleteConfirmationDialog.bind(this);
    this.closeDeleteConfirmationDialog = this.closeDeleteConfirmationDialog.bind(this);
  }

  render() {
    const { isDeleteConfirmationDialogOpen } = this.state;
    const { feedCommentReply, refreshComments } = this.props;
    const { author, content, createdAt } = feedCommentReply;

    return (
      <Paper full>
        <GroupFeedPostContent 
          className="group-feed-post-comment-reply-content"
          avatarSize={ 20 }
          author={ author } 
          content={ content } 
          createdAt={ createdAt }
          handleClickEdit={ this.startEditing }
          handleClickDelete={ this.openDeleteConfirmationDialog } /> 

        <GroupFeedDeleteDialog
          endpoint="/feedpostCommentReply"
          toSubmit={{ ReplyId: feedCommentReply.id }}
          isOpen={ isDeleteConfirmationDialogOpen }
          handleCloseDialog={ this.closeDeleteConfirmationDialog }
          afterDelete={ refreshComments } />
      </Paper>
    );
  }

  expandReplies() {
    this.setState({ expanded: true });
  }

  collapseReplies() {
    this.setState({ expanded: false });
  }

  toggleReplies() {
    this.setState({ expanded: !this.state.expanded });
  }

  openReplyBox() {
    this.setState({ isReplyBoxOpen: true, expanded: true });
  }

  closeReplyBox() {
    this.setState({ isReplyBoxOpen: false });
  }

  openDeleteConfirmationDialog() {
    this.setState({ isDeleteConfirmationDialogOpen: true });
  }

  closeDeleteConfirmationDialog() {
    this.setState({ isDeleteConfirmationDialogOpen: false });
  }

  startEditing() {
    this.setState({ isEditing: true });
  }

  stopEditing() {
    this.setState({ isEditing: false });
  }
}