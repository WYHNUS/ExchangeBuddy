import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from 'actions/MessageSnackbar';
import { del } from 'util/api';

import ChildComponent from './GroupFeedDeleteDialog';

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch, { endpoint }) => ({
  ...bindActionCreators({ showSnackbar }, dispatch),
  submitDelete(toSubmit, afterSubmit, failSubmit) {
    del(endpoint, toSubmit, { userToken: true }, afterSubmit, failSubmit);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);