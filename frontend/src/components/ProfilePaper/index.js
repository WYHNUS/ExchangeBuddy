import { Meteor } from 'meteor/meteor';
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './ProfilePaper';

// react-komposer
const composer = (props, onData) => {
  const { userId } = props;

  let user;

  if (userId)
    Meteor.call('User.get', parseInt(userId), (err, userResult) => {
      user = userResult;
      Meteor.call('User.getGroups', user.id, (err, groups) => {
        const exchangeUniversities = groups.map(group => group.university);

        Meteor.call('University.get', user.homeUniId, (err, homeUni) => {
          onData(null, {
            user,
            userHomeUniversity: homeUni,
            userExchangeUniversities: exchangeUniversities,
          });
        });
      });

    });
  else {
    user = Meteor.user();
    Meteor.call('User.getGroups', user.id, (err, groups) => {
      const exchangeUniversities = groups.map(group => group.university);

      Meteor.call('University.get', user.homeUniId, (err, homeUni) => {
        onData(null, {
          user,
          userHomeUniversity: homeUni,
          userExchangeUniversities: exchangeUniversities,
        });
      });
    });
  }
};

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);

// redux
const mapStateToProps = (state, ownProps) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
