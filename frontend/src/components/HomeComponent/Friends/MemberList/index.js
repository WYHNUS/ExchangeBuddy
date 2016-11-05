import React from 'react';
import Loading from '../../../Loading';

import ChildComponent from './MemberList';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showSnackbar } from '../../../../actions/messageSnackbar';
import { clearUser } from '../../../../actions/authActions';
import {addingGroupSuccessUpdate} from '../../../../actions/home'


const mapDispatchToProps = (dispatch) => {
  return {
  	clearUser: () => {
      dispatch(clearUser());
    },
    showSnackbar: (message) => {
      dispatch(showSnackbar(message))
    },
    addingGroupSuccessUpdate:(userObject)=>{
    	dispatch(addingGroupSuccessUpdate(userObject))
    }
  };
};

const mapStateToProps = (state) => {
  return {
    user:state.user.userObject,
    homeGroupDetails: state.home.homeGroupDetails
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
