import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from 'actions/MessageSnackbar';
import { del } from 'util/api';

import ChildComponent from './GroupFeedPost';

const mapStateToProps = (state) => ({
  user: state['User/currentUser'],
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
  submitDeleteFeedPost({ id }, afterSubmit, failSubmit) {
    const toSubmit = {
      FeedPostId: id,
    };

    del('/feedpost', toSubmit, { userToken: true }, afterSubmit, failSubmit);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);