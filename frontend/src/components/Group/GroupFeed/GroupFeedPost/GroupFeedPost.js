import React from 'react';

import { CardText, CardActions } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import IconContainer from 'components/IconContainer';
import Paper from 'components/Paper';
import GroupFeedPostComments from './GroupFeedPostComments';

import { formatRelaTime } from 'util/helper';
import { getAvatarUrl } from 'util/user';
import { groupPropType, userPropType, feedPostPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
import './GroupFeedPost.scss';

class GroupFeedPost extends React.Component { 

  static propTypes = {
    group: groupPropType.isRequired,
    feedPost: feedPostPropType.isRequired,
    user: userPropType,
    showSnackbar: React.PropTypes.func.isRequired,
    submitDeleteFeedPost: React.PropTypes.func.isRequired,
    refreshGroupFeed: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      isDeleteConfirmationDialogOpen: false,
    };

    this.toggleComments = this.toggleComments.bind(this);
    this.editFeedPost = this.editFeedPost.bind(this);
    this.openDeleteConfirmationDialog = this.openDeleteConfirmationDialog.bind(this);
    this.closeDeleteConfirmationDialog = this.closeDeleteConfirmationDialog.bind(this);
  }

  render() {
    const { expanded, isDeleteConfirmationDialogOpen } = this.state;
    const { user, group, feedPost, showSnackbar, submitDeleteFeedPost, refreshGroupFeed } = this.props;
    const { content, author, createdAt } = feedPost;

    const postDropdown = (
      <IconMenu iconButtonElement={ <IconButton><Icon name="keyboard_arrow_down" /></IconButton> }>
        <MenuItem className="post-dropdown-menuitem" primaryText="Edit" onClick={ this.editFeedPost } />
        <MenuItem className="post-dropdown-menuitem" primaryText="Delete" onClick={ this.openDeleteConfirmationDialog } />
      </IconMenu>
    );

    const DeleteConfirmationDialog = () => (
      <Dialog 
        open={ isDeleteConfirmationDialogOpen }
        onRequestClose={ this.closeDeleteConfirmationDialog }
        actions={[
          <FlatButton label="Cancel" labelStyle={{ color: Colors.grey500 }} onClick={ this.closeDeleteConfirmationDialog } />,
          <FlatButton 
            primary 
            label="Delete" 
            onClick={ () => submitDeleteFeedPost({ 
              id: feedPost.id 
            }, () => {
              this.closeDeleteConfirmationDialog();
              refreshGroupFeed();
              showSnackbar('Post deleted.');
            }, (err) => {
              this.closeDeleteConfirmationDialog();
              showSnackbar('Could not delete post: ' + err);
            }) } />
        ]}>
        <IconContainer icon="warning" title="Are you sure you want to delete your post?" />
      </Dialog>
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

          <DeleteConfirmationDialog />
        </div>
      </div>
    );
  }

  toggleComments() {
    this.setState({ expanded: !this.state.expanded });
  }

  openDeleteConfirmationDialog() {
    this.setState({ isDeleteConfirmationDialogOpen: true });
  }

  closeDeleteConfirmationDialog() {
    this.setState({ isDeleteConfirmationDialogOpen: false });
  }

  editFeedPost() {
    // TODO: Open edit box
  }
}

export default GroupFeedPost;
  

