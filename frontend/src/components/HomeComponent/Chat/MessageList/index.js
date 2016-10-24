import React from 'react';
import Loading from '../../../Loading';

// Component
import ChildComponent from './MessageList';

import {fetchGroupMessages, fetchGroupMessagesSuccess,
  fetchGroupMessagesFailure} from '../../../../actions/home'


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
