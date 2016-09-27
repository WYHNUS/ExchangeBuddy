import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { closeSwitchGroupDialog } from '../../../client/actions/switchGroupDialog';
import { showSnackbar } from '../../../client/actions/snackbar';

// Component
import ChildComponent from './SwitchGroupDialog';

// react-komposer
const composer = (props, onData) => {
  const user = Meteor.user();

  if (!user)
    return onData(null, { user: null, groups: [] });

  Meteor.call('User.getGroups', user.id, (err, groups) => {
    onData(null, { user, groups });
  });
};

const ComposedComponent = composeWithTracker(composer, null)(ChildComponent);

// redux
const mapStateToProps = (state, ownProps) => {
  return {
    open: !!state.switchGroupDialogOpen
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ closeSwitchGroupDialog, showSnackbar }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
