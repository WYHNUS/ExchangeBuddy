import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Models
import GroupChatMessage from '../../../../../api-mongo/GroupChatMessage';

// Component
import ChildComponent from './MessageList';

// react-komposer
const composer = (props, onData) => {
  const groupId = parseInt(props.groupId);

  if (groupId) {
    const sub = Meteor.subscribe('messages-for-group', groupId);

    if (sub.ready()) {
      const messages = GroupChatMessage.find({ groupId }, { sort: { createdAt: 1 } }).fetch();
      const messageUserIds = messages.map(msg => msg.userId);

      if (!messages)
        return;

      Meteor.call('User.getUsers', messageUserIds, (err, users) => {
        if (!users)
          return;

        const userHashMap = {};
        users.forEach(user => userHashMap[user.id] = user);

        const normalizedMessages = messages.map(msg => {
          return {
            ...msg,
            user: userHashMap[msg.userId]
          };
        });

        onData(null, { messages: normalizedMessages, user: Meteor.user() });
      });
    }
  }
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
