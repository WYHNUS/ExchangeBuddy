import React from 'react';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import Loading from '../../../Loading';

// Component
import ChildComponent from './MessageList';

import { 
  fetchGroupMessages, fetchGroupMessagesSuccess, fetchGroupMessagesFailure
} from '../../../../actions/home'
import { clearUser } from '../../../../actions/authActions';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroupMessages: (groupId) => {
      dispatch(fetchGroupMessages(groupId)).payload.then((response) => {
        if (!response.error) {
          dispatch(fetchGroupMessagesSuccess(response.body));
        } else {
          dispatch(fetchGroupMessagesFailure(response.error));
        }
      }, (err) => {
        if (err.status === 401) {
          cookie.remove('authToken');
          dispatch(clearUser());
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } else {
          dispatch(fetchGroupMessagesFailure(err.response.error.message));
        }
      });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    homeMessages: state.home.homeMessages,
    user: state.user,
    homeGroupDetails: state.home.homeGroupDetails
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
