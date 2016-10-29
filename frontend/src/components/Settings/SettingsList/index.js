import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { attemptLogout, clearUser } from '../../../actions/authActions'

// Component
import ChildComponent from './SettingsList';

// redux
const mapStateToProps = (state) => {
  return {
  	user:state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    attemptLogout: () => { dispatch(attemptLogout()) },
    clearUser: () => { dispatch(clearUser()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
