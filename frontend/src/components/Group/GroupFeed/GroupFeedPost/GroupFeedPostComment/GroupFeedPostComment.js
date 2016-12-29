import React from 'react';
import Paper from 'components/Paper';
import Icon from 'components/Icon';

import GroupFeedPostCommentReply from './GroupFeedPostCommentReply';
import GroupFeedPostCommentCardHeader from './GroupFeedPostCommentCardHeader';
import GroupFeedPostWriteReply from './GroupFeedPostWriteReply';

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
  }

  render() {
    const { feedComment, refreshComments } = this.props;
    const { content, author, createdAt, replies } = feedComment;

    return (

      <div className="comment-overall-container">
        <Paper full>

          <div className="comment-main-container">
            <div className="col-xs-12">
              <GroupFeedPostCommentCardHeader 
                author={ author } 
                content={ content } 
                createdAt={ createdAt }
                afterContent={
                  <div className="comment-actions">
                    <div className="comment-action replies" onClick={ this.handleClickExpand.bind(this) }>Replies ({ replies.length })</div>
                    <div className="comment-action reply" onClick={ this.handleClickReply.bind(this) }> 
                      <Icon name="reply" size={16} color={ Colors.grey400 } /> Reply
                    </div>
                  </div>
                } />
            </div>
          </div>

          { this.state.expanded &&
            <div className="reply-main-container">
              <div className="col-xs-12">
                { feedComment.replies.map((reply, idx) => (
                  <GroupFeedPostCommentReply key={ idx } feedCommentReply={ reply } />
                )) }
              </div>
            </div>
          }

          <GroupFeedPostWriteReply 
            isOpen={ this.state.isReplyBoxOpen }
            form={`groupFeedPostWriteReplyForm-${ feedComment.id }`}
            feedComment={ feedComment } 
            refreshComments={ refreshComments } 
            handleCloseReplyBox={ () => this.setState({ isReplyBoxOpen: false }) } />

        </Paper>
      </div>

      )

  }

  handleClickExpand() {
    this.setState({ expanded: true });
  }

  handleClickReply() {
    this.setState({ isReplyBoxOpen: true });
  }

}

export default GroupFeedPostComment;
  