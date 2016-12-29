import React from 'react';

import { CardText, CardHeader, CardActions } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import Paper from 'components/Paper';
import GroupFeedPostComments from './GroupFeedPostComments';

import { formatRelaTime } from 'util/helper';
import { getAvatarUrl } from 'util/user';
import { groupPropType, userPropType, feedPostPropType } from 'util/propTypes';

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

    this.toggleComments = this.toggleComments.bind(this);
    this.editFeedPost = this.editFeedPost.bind(this);
    this.deleteFeedPost = this.deleteFeedPost.bind(this);
  }

  render() {
    const { expanded, isPostDropdownOpen } = this.state;
    const { user, group, feedPost } = this.props;
    const { content, author, createdAt } = feedPost;

    const postDropdown = (
      <IconMenu iconButtonElement={ <IconButton><Icon name="keyboard_arrow_down" /></IconButton> }>
        <MenuItem className="post-dropdown-menuitem" primaryText="Edit" onClick={ this.editFeedPost } />
        <MenuItem className="post-dropdown-menuitem" primaryText="Delete" onClick={ this.deleteFeedPost } />
      </IconMenu>
    );

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="post-main-container"> 
            <Paper full>           
              <AvatarRow 
                className="post-header-row"
                avatar={ getAvatarUrl(author, 40) } 
                rightIcon={ user && user.id === author.id ? postDropdown : null }>
                <div className="post-header">
                  <span className="post-title"> 
                    <span className="post-author-name">{ author.name }</span>
                    <span className="post-timestamp">{ formatRelaTime(createdAt) }</span>
                  </span>
                  <span className="post-subtitle">{ author.university.name  }</span>
                </div>
              </AvatarRow>
              <CardText>
                <div className="post-content">{ content }</div>
              </CardText>

              <CardActions>
                <FlatButton label="Comments" onTouchTap={ this.toggleComments } />
              </CardActions>

            </Paper>    
          </div>

          { expanded &&
            <GroupFeedPostComments group={ group } feedPost={ feedPost } />
          }    
        </div>
      </div>
    );
  }

  toggleComments() {
    this.setState({ expanded: !this.state.expanded });
  }

  editFeedPost() {
    // TODO: Open edit box
  }

  deleteFeedPost() {
    // TODO: Open confirmation dialog
  }
}

export default GroupFeedPost;
  

