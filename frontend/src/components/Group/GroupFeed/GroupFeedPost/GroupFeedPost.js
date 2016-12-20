import React from 'react';
import Paper from 'components/Paper';
import GroupFeedPostComment from './GroupFeedPostComment/GroupFeedPostComment';
import { groupPropType, userPropType } from 'util/propTypes';

import './GroupFeedPost.scss';

const GroupFeedPost = ({group}) => (
  <div className="row">
    <div className="col-xs-12">
       
       <div className="post-main-container"> 
          <Paper>           
            Group feed post 1
          </Paper>    
        </div>

        <div className="comments-main-container">
          <Paper>
            <GroupFeedPostComment group={ group } />
          </Paper>
        </div>

    </div>
  </div>
);

GroupFeedPost.propTypes = {
  group: groupPropType.isRequired,
  user: userPropType,
};

export default GroupFeedPost;