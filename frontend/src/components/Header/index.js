import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';
import { browserHistory } from 'react-router';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../../client/actions/snackbar';
import { openSwitchGroupDialog } from '../../../client/actions/switchGroupDialog';

// Component
import ChildComponent from './Header';

// react-komposer
const composer = (props, onData) => {
  const user = Meteor.user();
  const groupId = parseInt(props.params.id);

  if (!groupId)
    return browserHistory.push(`/`);

  Meteor.call('Group.get', groupId, (err, group) => {
    if (!group)
      return browserHistory.push(`/`);

    onData(null, {
      user,
      uni: group.university,
      group
    });
  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapStateToProps = (state, ownProps) => {
  return{
    params: ownProps.params,
    tab: ownProps.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar, openSwitchGroupDialog }, dispatch),
  };
};

const Header = connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);

export default Header;
