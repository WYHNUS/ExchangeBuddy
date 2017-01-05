import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChildComponent from './GroupFeedPostUpdateReply';

import { patch } from 'util/api';
import { showSnackbar } from 'actions/MessageSnackbar';

const mapStateToProps = (state, { feedCommentReply: { content } }) => ({
  user: state['User/currentUser'],
  initialValues: {
    content
  },
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
  submitPost({ feedPostCommentReplyId, content }, afterSubmit, failSubmit) {
    const toSubmit = {
      content,
    };

    patch(`/feedpost/comment/reply/${ feedPostCommentReplyId }`, toSubmit, { userToken: true }, afterSubmit, failSubmit);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);