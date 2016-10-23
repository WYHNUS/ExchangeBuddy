import React from 'react';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './ProfilePaper';

import { fetchProfileSuccess, fetchProfileFailure } from '../../actions/profile';
import {fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure} from '../../actions/utilityInfo';
import {showSnackbar} from '../../actions/messageSnackbar';

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
    profile: state.profile.user.user,
    userObject: state.user.userObject,
    /*userHomeUniversity: state.profile.userHomeUniversity.userHomeUniversity,
    userExchangeUniversities: state.profile.userExchangeUniversities.userExchangeUniversities,
    userProfile: state.user.userProfile,*/
    universities: state.utilityInfo.universitiesList.universities
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    fetchProfileSuccess:(data)=>{
      dispatch(fetchProfileSuccess(data));
    },
    fetchProfileFailure:(data)=>{
      dispatch(fetchProfileFailure(data));
    },
    fetchAllUniversitiesSuccess:(data) => {
      dispatch(fetchAllUniversitiesSuccess(data));
    },
    fetchAllUniversitiesFailure:(data)=>{
      dispatch(fetchAllUniversitiesFailure(data));
    },
    showSnackbar:(message)=>{
      dispatch(showSnackbar(message))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
