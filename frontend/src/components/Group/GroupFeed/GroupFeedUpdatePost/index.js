import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChildComponent from './GroupFeedUpdatePost';

import { patch } from 'util/api';
import { showSnackbar } from 'actions/MessageSnackbar';

const mapStateToProps = (state, { feedPost: { content } }) => ({
  user: state['User/currentUser'],
  initialValues: {
    content
  },
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
  submitPost({ feedPostId, content }, afterSubmit, failSubmit) {
    const toSubmit = {
      content,
    };

    patch(`/feedpost/${ feedPostId }`, toSubmit, { userToken: true }, afterSubmit, failSubmit);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);