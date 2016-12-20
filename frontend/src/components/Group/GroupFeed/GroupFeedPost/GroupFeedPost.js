import React from 'react';
import Paper from 'components/Paper';
import GroupFeedPostComment from './GroupFeedPostComment/GroupFeedPostComment';
import {CardText, CardHeader} from 'material-ui/Card';
import { groupPropType, userPropType } from 'util/propTypes';

import './GroupFeedPost.scss';

const GroupFeedPost = ({group}) => (
  <div className="row">
    <div className="col-xs-12">
       
       <div className="post-main-container"> 
          <Paper full>           
            <CardHeader
              title="John Stone"
              subtitle="Subtitle"
              avatar="http://lorempixel.com/output/people-q-c-640-480-6.jpg"
            />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>

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