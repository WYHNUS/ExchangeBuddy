import React from 'react';
import Loading from '../../../Loading';

import ChildComponent from './MemberList';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*// react-komposer
const composer = (props, onData) => {

  const groupId = parseInt(props.groupId);

  // Get groupUsers
  if (groupId) {
    Meteor.call('Group.getUsers', groupId, (err, groupUsers) => {
      onData(null, {
        groupUsers
      })
    });
  }

};*/



const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state) => {
  return {
    user:state.user,
    homeFriends: state.home.homeFriends
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
