import React from 'react';
import cn from 'classnames';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Icon from 'components/Icon';
import IconButton from 'material-ui/IconButton';

import { userPropType, feedPostCommentPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
import './GroupFeedPostWriteReply.scss';

const validate = ({ content }) => {
  const errors = {};

  if (!content || !content.length)
    errors.content = 'Speak up, my friend!';

  return errors;
};

class GroupFeedPostWriteReply extends React.PureComponent {
  static propTypes = {
    ...reduxFormPropTypes,
    user: userPropType.isRequired,
    feedComment: feedPostCommentPropType.isRequired,
    showSnackbar: React.PropTypes.func.isRequired,
    refreshComments: React.PropTypes.func.isRequired,
    isOpen: React.PropTypes.bool,
    closeReplyBox: React.PropTypes.func.isRequired,
    expandReplies: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.getFormSubmit = this.getFormSubmit.bind(this);
  }

  componentDidUpdate({ isOpen: prevIsOpen }) {
    const { isOpen } = this.props;

    if (!prevIsOpen && isOpen) {
      this.contentTextField && this.contentTextField.getRenderedComponent().getRenderedComponent().focus();
    }
  }

  render() {
    const { isOpen, closeReplyBox } = this.props;

    return (
      <form onSubmit={ this.getFormSubmit() } onBlur={ closeReplyBox }>
        <div className={ cn('group-feed-post-write-reply', { visible: isOpen }) }>
          <IconButton onClick={ closeReplyBox }>
            <Icon name="close" color={ Colors.grey500 } size={16} />
          </IconButton> 

          <Field 
            component={ TextField }
            withRef
            ref={ (input) => this.contentTextField = input }
            name="content" 
            hintText="Reply" 
            fullWidth
            underlineShow={ false } 
            style={{ fontSize: 12 }}
            errorStyle={{ display: 'none' }} />

          <IconButton type="submit">
            <Icon name="send" color={ Colors.grey500 } size={16} />
          </IconButton> 
        </div>
      </form>
    );
  }

  getFormSubmit() {
    const { feedComment, user, refreshComments, closeReplyBox, expandReplies, showSnackbar, submitPost, handleSubmit, reset } = this.props;

    return handleSubmit(({ content }) => {
      submitPost({ content, userId: user.id, feedPostCommentId: feedComment.id }, () => {
        reset();
        expandReplies();
        refreshComments();
        closeReplyBox();
      }, (err) => {
        showSnackbar('Could not add reply: ' + err);
      });
    });
  }
}

export default reduxForm({
  validate
})(GroupFeedPostWriteReply);