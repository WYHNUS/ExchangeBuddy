import React from 'react';
import Paper from 'components/Paper';
import Avatar from 'material-ui/Avatar';
import { CardHeader } from 'material-ui/Card';
import { groupPropType, feedPostCommentReplyPropType } from 'util/propTypes';

import './GroupFeedPostCommentReply.scss';

const GroupFeedPostCommentReply = ({group}) => (
  <div className="row no-margin">
    <div className="col-xs-12">
      <Paper full>
          <CardHeader
            title={
              <span>Bailey White <span className="timestamp">1h</span></span>
            }
            titleStyle={{fontSize:12, fontWeight:'bold'}}
            subtitle="Hahahahahahaha look at you so excited"
            subtitleColor="#000000"
            subtitleStyle={{fontSize:12, fontWeight:'normal'}}
            avatar={
              <Avatar
                src="http://lorempixel.com/output/people-h-c-577-626-6.jpg"
                size={30}
              />
            }    
          />

      </Paper>
    </div>
  </div>
);

GroupFeedPostCommentReply.propTypes = {
  group: groupPropType.isRequired,
  feedCommentReply: feedPostCommentReplyPropType.isRequired,
};

export default GroupFeedPostCommentReply;
  