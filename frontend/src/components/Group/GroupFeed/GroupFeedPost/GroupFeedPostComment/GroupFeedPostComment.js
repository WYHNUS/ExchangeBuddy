import React from 'react';
import Paper from 'components/Paper';

import GroupFeedPostUpdateComment from '../GroupFeedPostUpdateComment';
import GroupFeedPostCommentReply from '../GroupFeedPostCommentReply';
import GroupFeedPostContent from '../GroupFeedPostContent';
import GroupFeedPostWriteReply from '../GroupFeedPostWriteReply';
import GroupFeedPostContentAction from '../GroupFeedPostContent/GroupFeedPostContentAction';
import GroupFeedDeleteDialog from 'components/Group/GroupFeed/GroupFeedDeleteDialog';

import { groupPropType, userPropType, feedPostCommentPropType } from 'util/propTypes';

import './GroupFeedPostComment.scss';

class GroupFeedPostComment extends React.Component {
  static propTypes = {
    group: groupPropType.isRequired,
    feedComment: feedPostCommentPropType.isRequired,
    user: userPropType,
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
    const { expanded, isReplyBoxOpen, isEditing, isDeleteConfirmationDialogOpen } = this.state;
    const { feedComment, refreshComments } = this.props;
    const { content, author, createdAt, replies } = feedComment;

    return (
      <div className="comment-overall-container">
        <Paper full>

          { isEditing 
            ? <GroupFeedPostUpdateComment
                form={`groupFeedPostUpdateComment-${ feedComment.id }`}
                feedComment={ feedComment } 
                refresh={ refreshComments }
                stopEditing={ this.stopEditing } />
            : <div>
                <div className="comment-main-container">
                  <GroupFeedPostContent 
                    className="group-feed-post-comment-content"
                    author={ author } 
                    content={ content } 
                    createdAt={ createdAt }
                    contentActions={[
                      <GroupFeedPostContentAction 
                        key="replies"
                        icon={ `keyboard_arrow_${ expanded ? 'up' : 'down' }` } 
                        primaryText={ `${ expanded ? 'Hide' : 'Show' } Replies (${ replies.length })` }
                        onClick={ this.toggleReplies } />,
                      <GroupFeedPostContentAction key="reply" icon="reply" primaryText="Reply" onClick={ this.openReplyBox } />
                    ]}
                    handleClickEdit={ this.startEditing }
                    handleClickDelete={ this.openDeleteConfirmationDialog } />
                </div>

                { expanded &&
                  <div className="reply-main-container">
                    { feedComment.replies.map((reply, idx) => (
                      <GroupFeedPostCommentReply key={ idx } feedCommentReply={ reply } refreshComments={ refreshComments } />
                    )) }
                  </div>
                }

                <GroupFeedPostWriteReply 
                  isOpen={ isReplyBoxOpen }
                  form={`groupFeedPostWriteReplyForm-${ feedComment.id }`}
                  feedComment={ feedComment } 
                  refreshComments={ refreshComments } 
                  closeReplyBox={ this.closeReplyBox }
                  expandReplies={ this.expandReplies } />

                <GroupFeedDeleteDialog
                  endpoint={`/feedpost/comment/${ feedComment.id }`}
                  isOpen={ isDeleteConfirmationDialogOpen }
                  handleCloseDialog={ this.closeDeleteConfirmationDialog }
                  afterDelete={ refreshComments } />
              </div>
          }
        </Paper>
      </div>
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

export default GroupFeedPostComment;
  