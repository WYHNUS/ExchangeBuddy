import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChildComponent from './GroupFeedPostWriteComment';

import { put } from 'util/api';
import { showSnackbar } from 'actions/MessageSnackbar';

const mapStateToProps = (state) => ({
  user: state['User/currentUser']
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
  submitPost({ userId, feedPostId, content }, afterSubmit, failSubmit) {
    const toSubmit = {
      authorId: userId,
      FeedPostId: feedPostId,
      content,
    };

    put('/feedpostComment', toSubmit, { userToken: true }, afterSubmit, failSubmit);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);