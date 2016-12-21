import React from 'react';
import Paper from 'components/Paper';
import Avatar from 'material-ui/Avatar';
import GroupFeedPostCommentReply from './GroupFeedPostCommentReply/GroupFeedPostCommentReply';
import { CardHeader } from 'material-ui/Card';
import Icon from 'components/Icon';
import { groupPropType, userPropType, feedPostCommentPropType } from 'util/propTypes';

import { formatRelaTime } from 'util/helper';

import * as Colors from 'material-ui/styles/colors';
import './GroupFeedPostComment.scss';

const PostCommentReplyContent = ({ content, handleClickReply }) => (
  <div>
    <div>{ content }</div> 
    <div className="reply" onTouchTap={ handleClickReply }> 
      <Icon name="reply" size={16} color={ Colors.grey400 } /> Reply
    </div>
  </div>
);

PostCommentReplyContent.propTypes = {
  content: React.PropTypes.string.isRequired,
  handleClickReply: React.PropTypes.func.isRequired,
};

const PostCommentInfo = ({ name, timestamp }) => (
  <span className="comment-info"> { name } <span className="timestamp">{ formatRelaTime(timestamp) }</span></span>
)

PostCommentInfo.propTypes = {
  name: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.instanceOf(Date).isRequired,
};

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
    const { group, feedComment } = this.props;
    const { content, author, createdAt } = feedComment;

    return(

      <div className="comment-overall-container">
        <Paper full>

          <div className="comment-main-container">
            <div className="col-xs-12">
              <CardHeader
                title={
                  <PostCommentInfo name={ author.name } timestamp={ createdAt } />
                }

                subtitle={
                  <PostCommentReplyContent content={ content } handleClickReply={ this.handleExpand.bind(this) } />
                }
                
                subtitleColor="#000000"
                subtitleStyle={{fontSize:12, fontWeight:'normal'}}
                
                avatar={
                  <Avatar
                    src="http://lorempixel.com/output/people-q-c-640-480-7.jpg"
                    size={30}
                  />
                
                }
              />

              

            </div>
          </div>

          { this.state.expanded &&
            <div className="reply-main-container">
              <div className="col-xs-12">
                { feedComment.replies.map((reply, idx) => (
                  <GroupFeedPostCommentReply key={ idx } group={ group } feedCommentReply={ reply } />
                )) }
              </div>
            </div>
          }

        </Paper>
      </div>

      )

  }

  handleExpand = () => {
    this.setState({expanded: true});
  };

}

export default GroupFeedPostComment;
  