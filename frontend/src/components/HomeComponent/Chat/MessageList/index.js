//import { Meteor } from 'meteor/meteor';
import React from 'react';
//import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Models
//import GroupChatMessage from '../../../../../api-mongo/GroupChatMessage';

// Component
import ChildComponent from './MessageList';

// react-komposer
/*const composer = (props, onData) => {
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
};*/

//const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

const date = new Date();
const defaultUrl = '../../../../res/user.png';

//groupId: 213324
//api: /api/group/:groupId/messages

var seed = 
[
{
  type: 'user', //user or eventFB or eventMU
  user: {
    userId: 12341,
    displayName: 'Lee Kai Yi',
    userAvatarUrl: defaultUrl
  },
  content: 'hello, this is the first msg',
  createdAt: date
},
{
  type: 'eventFB', //user or event
  user: {
    userId: 12342,
    displayName: 'Yanhao',
    userAvatarUrl: defaultUrl
  },
  content: 'hello, this is the first event',
  createdAt: date,
  eventPosting:{
    id: 1234123,
    url: 'http://meetup.com',
    yes_rsvp_count: 4,
    name: 'cat event',
    profilePicture: '',
    coverPicture: '',
    startTime: date
  }
},
{
  type: 'user', //user or event
  user: {
    userId: 123413,
    displayName: 'Hanming',
    userAvatarUrl: defaultUrl
  },
  content: 'hello, this is the second msg',
  createdAt: date
}
]


// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    fetchHomeMessages:(groupId)=>{
      dispatch(fetchHomeMessages(groupId)).then((response) => {
            !response.error ? dispatch(fetchPostsSuccess(response.payload)) : dispatch(fetchPostsFailure(response.payload));
          });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    messages: seed,
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
