import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showSnackbar } from 'actions/MessageSnackbar';
import { setCurrentUser } from 'actions/User';

import Logout from './Logout';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar, setCurrentUser }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Logout);