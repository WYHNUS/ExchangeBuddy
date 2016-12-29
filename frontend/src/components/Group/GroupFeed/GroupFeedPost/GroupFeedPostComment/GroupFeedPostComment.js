import React from 'react';
import Paper from 'components/Paper';
import Icon from 'components/Icon';

import GroupFeedPostCommentReply from '../GroupFeedPostCommentReply';
import GroupFeedPostHeader from '../GroupFeedPostHeader';
import GroupFeedPostWriteReply from '../GroupFeedPostWriteReply';

import { groupPropType, userPropType, feedPostCommentPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
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
    };

    this.expandReplies = this.expandReplies.bind(this);
    this.collapseReplies = this.collapseReplies.bind(this);
    this.toggleReplies = this.toggleReplies.bind(this);
    this.openReplyBox = this.openReplyBox.bind(this);
    this.closeReplyBox = this.closeReplyBox.bind(this);
  }

  render() {
    const { expanded, isReplyBoxOpen } = this.state;
    const { feedComment, refreshComments } = this.props;
    const { content, author, createdAt, replies } = feedComment;

    return (

      <div className="comment-overall-container">
        <Paper full>

          <div className="comment-main-container">
            <div className="col-xs-12">
              <GroupFeedPostHeader 
                author={ author } 
                content={ content } 
                createdAt={ createdAt }
                afterContent={
                  <div className="comment-actions">
                    <div className="comment-action replies" onClick={ this.toggleReplies }>
                      { expanded ? 'Hide' : 'Show' } Replies ({ replies.length })
                    </div>
                    <div className="comment-action reply" onClick={ this.openReplyBox }> 
                      <Icon name="reply" size={16} color={ Colors.grey400 } /> Reply
                    </div>
                  </div>
                } />
            </div>
          </div>

          { expanded &&
            <div className="reply-main-container">
              <div className="col-xs-12">
                { feedComment.replies.map((reply, idx) => (
                  <GroupFeedPostCommentReply key={ idx } feedCommentReply={ reply } />
                )) }
              </div>
            </div>
          }

          <GroupFeedPostWriteReply 
            isOpen={ isReplyBoxOpen }
            form={`groupFeedPostWriteReplyForm-${ feedComment.id }`}
            feedComment={ feedComment } 
            refreshComments={ refreshComments } 
            closeReplyBox={ this.closeReplyBox }
            expandReplies={ this.expandReplies } />

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

}

export default GroupFeedPostComment;
  