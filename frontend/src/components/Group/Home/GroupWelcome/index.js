import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './GroupWelcome';

// react-komposer
const composer = (props, onData) => {

  const groupId = parseInt(props.groupId);

  // Get groupUsers
  if (groupId) {
    Meteor.call('Group.get', groupId, (err, group) => {
      onData(null, {
        group
      })
    });
  }

};

export default composeWithTracker(composer, Loading)(ChildComponent);
