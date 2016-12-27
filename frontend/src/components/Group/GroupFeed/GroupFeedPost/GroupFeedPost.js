import React from 'react';
import Paper from 'components/Paper';
import { CardText, CardHeader, CardActions } from 'material-ui/Card';
import { groupPropType, userPropType, feedPostPropType } from 'util/propTypes';
import FlatButton from 'material-ui/FlatButton';
import GroupFeedPostComments from './GroupFeedPostComments';

import { getAvatar } from 'util/user';

import './GroupFeedPost.scss';

class GroupFeedPost extends React.Component { 

  static propTypes = {
    group: groupPropType.isRequired,
    feedPost: feedPostPropType.isRequired,
    user: userPropType,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render() {

    const { group, feedPost } = this.props;
    const { content, author } = feedPost;

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="post-main-container"> 
              <Paper full>           
                <CardHeader
                  title={ author.name }  
                  subtitle={ author.university.name }
                  avatar={ getAvatar(author, 40) }
                />
                <CardText> { content } </CardText>

                <CardActions>
                  <FlatButton label="Comments" onTouchTap={this.handleExpand.bind(this)} />
                </CardActions>

              </Paper>    
            </div>

            { this.state.expanded &&
              <GroupFeedPostComments group={ group } feedPost={ feedPost } />
            }    
          </div>
        </div>
      </div>
    );
  }

  handleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };

}

export default GroupFeedPost;
  

