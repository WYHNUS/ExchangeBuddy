import React from 'react';
import Paper from 'components/Paper';
import Icon from 'components/Icon';

import GroupFeedPostCommentReply from './GroupFeedPostCommentReply';
import GroupFeedPostCommentCardHeader from './GroupFeedPostCommentCardHeader';

import { groupPropType, userPropType, feedPostCommentPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
import './GroupFeedPostComment.scss';

class GroupFeedPostComment extends React.Component {
  static propTypes = {
    group: groupPropType.isRequired,
    feedComment: feedPostCommentPropType.isRequired,
    user: userPropType,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render() {
    const { feedComment } = this.props;
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

        </Paper>
      </div>

      )

  }

  handleClickExpand() {
    this.setState({ expanded: true });
  }

  handleClickReply() {
    // TODO: Open reply box
  }

}

export default GroupFeedPostComment;
  