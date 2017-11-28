import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSnackbar } from 'actions/MessageSnackbar';

import { makeReq, put } from 'util/api';

import ChildComponent from './WikiForm';

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ showSnackbar }, dispatch),
    submitNewSection: makeReq(put, '/wiki/section', { userToken: true }),
    submitNewSectionVersion: makeReq(put, '/wiki/section/version', { userToken: true }),
  };
};

export default connect(null, mapDispatchToProps)(ChildComponent);