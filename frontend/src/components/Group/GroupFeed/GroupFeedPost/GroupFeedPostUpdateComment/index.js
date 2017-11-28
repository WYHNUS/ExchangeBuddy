import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChildComponent from './GroupFeedPostUpdateComment';

import { patch } from 'util/api';
import { showSnackbar } from 'actions/MessageSnackbar';

const mapStateToProps = (state, { feedComment: { content } }) => ({
  user: state['User/currentUser'],
  initialValues: {
    content
  },
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
  submitPost({ feedPostCommentId, content }, afterSubmit, failSubmit) {
    const toSubmit = {
      content,
    };

    patch(`/feedpost/comment/${ feedPostCommentId }`, toSubmit, { userToken: true }, afterSubmit, failSubmit);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);