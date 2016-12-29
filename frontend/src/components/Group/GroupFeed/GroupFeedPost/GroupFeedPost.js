import React from 'react';

import { CardText, CardActions } from 'material-ui/Card';
import { MenuItem } from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import Paper from 'components/Paper';

import GroupFeedPostComments from './GroupFeedPostComments';
import GroupFeedUpdatePost from '../GroupFeedUpdatePost';
import GroupFeedDeleteDialog from '../GroupFeedDeleteDialog';

import { formatRelaTime } from 'util/helper';
import { getAvatarUrl } from 'util/user';
import { groupPropType, userPropType, feedPostPropType } from 'util/propTypes';

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
      isEditing: false,
    };

    this.getPostDropdown = this.getPostDropdown.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    this.editFeedPost = this.editFeedPost.bind(this);
    this.stopEditingFeedPost = this.stopEditingFeedPost.bind(this);
    this.openDeleteConfirmationDialog = this.openDeleteConfirmationDialog.bind(this);
    this.closeDeleteConfirmationDialog = this.closeDeleteConfirmationDialog.bind(this);
  }

  render() {
    const { expanded, isEditing, isDeleteConfirmationDialogOpen } = this.state;
    const { user, group, feedPost, refreshGroupFeed } = this.props;
    const { content, author, createdAt } = feedPost;

    const PostDropdown = this.getPostDropdown();

    return (
      <div className="row">
        <div className="col-xs-12">
          { isEditing 
            ? <GroupFeedUpdatePost 
                form={`groupFeedUpdatePost-${ feedPost.id }`}
                feedPost={ feedPost } 
                refreshGroupFeed={ refreshGroupFeed } 
                stopEditingFeedPost={ this.stopEditingFeedPost } />
            : <div>
                <div className="post-main-container"> 
                  <Paper full>           
                    <AvatarRow 
                      className="post-header-row"
                      avatar={ getAvatarUrl(author, 40) } 
                      rightIcon={ user && user.id === author.id && <PostDropdown /> }>
                      <div className="post-header">
                        <span className="post-title"> 
                          <span className="post-author-name">{ author.name }</span>
                          <span className="post-timestamp">{ formatRelaTime(createdAt) }</span>
                        </span>
                        <span className="post-subtitle">{ author.university.name  }</span>
                      </div>
                    </AvatarRow>
                    <CardText>
                      <div className="post-content">
                        { content }
                      </div>
                    </CardText>

                    <CardActions>
                      <FlatButton label="Comments" onTouchTap={ this.toggleComments } />
                    </CardActions>

                  </Paper>    
                </div>

                { expanded &&
                  <GroupFeedPostComments group={ group } feedPost={ feedPost } />
                }

                <GroupFeedDeleteDialog
                  endpoint="/feedpost"
                  toSubmit={{ FeedPostId: feedPost.id }}
                  isOpen={ isDeleteConfirmationDialogOpen }
                  handleCloseDialog={ this.closeDeleteConfirmationDialog }
                  afterDelete={ refreshGroupFeed } />
              </div>
            }
        </div>
      </div>
    );
  }

  getPostDropdown() {
    return () => (
      <IconMenu iconButtonElement={ <IconButton><Icon name="more_horiz" /></IconButton> }>
        <MenuItem className="post-dropdown-menuitem" primaryText="Edit" onClick={ this.editFeedPost } />
        <MenuItem className="post-dropdown-menuitem" primaryText="Delete" onClick={ this.openDeleteConfirmationDialog } />
      </IconMenu>
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
    this.setState({ isEditing: true });
  }

  stopEditingFeedPost() {
    this.setState({ isEditing: false });
  }
}

export default GroupFeedPost;
  

