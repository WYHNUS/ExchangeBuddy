import React from 'react';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './ProfilePaper';

import { fetchProfile, fetchProfileSuccess, fetchProfileFailure } from '../../actions/profile';

/*// react-komposer
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
};*/

// redux
const mapStateToProps = (state) => {
  return {
    user: state.profile.user.user,
    userHomeUniversity: state.profile.userHomeUniversity.userHomeUniversity,
    userExchangeUniversities: state.profile.userExchangeUniversities.userExchangeUniversities,
    userObject: state.user.userObject,
    userProfile: state.user.userProfile
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    fetchProfile:(userId)=>{
      dispatch(fetchProfile(userId)).payload.then((response) => {
        if (!response.error) {
          dispatch(fetchProfileSuccess(response.data));
        } else {
          dispatch(fetchProfileFailure(response.error));
        }
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
