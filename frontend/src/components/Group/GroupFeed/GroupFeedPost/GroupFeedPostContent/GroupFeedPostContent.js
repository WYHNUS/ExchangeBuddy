import React from 'react';
import cn from 'classnames';

import AvatarRow from 'components/AvatarRow';
import Icon from 'components/Icon';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import { formatRelaTime } from 'util/helper';
import { getAvatarUrl } from 'util/user';
import { userPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
import './GroupFeedPostContent.scss';

export default class GroupFeedPostContent extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string, 
    user: userPropType.isRequired,
    author: userPropType.isRequired,
    content: React.PropTypes.oneOfType([
      React.PropTypes.string.isRequired,
      React.PropTypes.node.isRequired,
    ]).isRequired, 
    createdAt: React.PropTypes.instanceOf(Date),
    avatarSize: React.PropTypes.number,
    contentActions: React.PropTypes.node,
    handleClickEdit: React.PropTypes.func,
    handleClickDelete: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    avatarSize: 30,
  };

  render() {
    const { user, author, content, avatarSize, className, createdAt, contentActions, handleClickEdit, handleClickDelete } = this.props;
    const isUserAuthor = user && author && user.id === author.id;

    return (
      <AvatarRow 
        className={ cn('group-feed-post-content', className) }
        avatar={ getAvatarUrl(author) }
        size={ avatarSize }
        valign="top"
        rightIcon={
          <IconMenu iconButtonElement={ <IconButton><Icon name="more_horiz" size={16} color={ Colors.grey500 } /></IconButton> }>
            { isUserAuthor && 
              <MenuItem className="post-dropdown-menuitem" primaryText="Edit" onClick={ handleClickEdit } /> }
            { isUserAuthor && 
              <MenuItem className="post-dropdown-menuitem" primaryText="Delete" onClick={ handleClickDelete } /> }
          </IconMenu>
        }>
        
        <div className="group-feed-post-content-info"> 
          <span className="author-name">{ author.name }</span>
          { createdAt && <span className="timestamp">{ formatRelaTime(createdAt) }</span> }
        </div>

        <div className="group-feed-post-content-body">
          <div className="content">{ content }</div> 
          { contentActions && 
            <div className="actions">
              { contentActions }
            </div> 
          }
        </div>
      </AvatarRow>
    );
  }
}