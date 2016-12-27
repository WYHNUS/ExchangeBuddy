import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChildComponent from './GroupWritePostForm';

import { put } from 'util/api';
import { showSnackbar } from 'actions/MessageSnackbar';

const mapStateToProps = (state) => ({
  user: state['User/currentUser']
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
  submitPost({ userId, groupId, content }, afterSubmit, failSubmit) {
    const toSubmit = {
      authorId: userId,
      GroupId: groupId,
      content,
    };

    put('/feedpost', toSubmit, { userToken: true }, afterSubmit, failSubmit);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);