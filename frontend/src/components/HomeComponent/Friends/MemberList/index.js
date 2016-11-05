import React from 'react';
import Loading from '../../../Loading';

import ChildComponent from './MemberList';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state) => {
  return {
    user:state.user.userObject,
    homeFriends: state.home.homeFriends
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
