import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators

// Component
import ChildComponent from './SignupStepper';

// react-komposer
const composer = (props, onData) => {
  const user = Meteor.user();

  // Get all universities
  Meteor.call('University.getAll', (err, universities) => {
    // Check if user has joined a group
    Meteor.call('User.getGroups', user.id, (err, userGroups) => {
      const hasJoinedGroup = userGroups && userGroups.length && user.homeUniId;

      onData(null, {
        user, universities, hasJoinedGroup
      });
    });
  });
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const SignupStepper = connect(null, mapDispatchToProps)(ComposedComponent);

export default SignupStepper;
