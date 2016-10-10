import React from 'react';
import Loading from '../Loading';

// Action creators

// Component
import ChildComponent from './SignupStepper';

// react-komposer
/*const composer = (props, onData) => {
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

const ComposedComponent = composeWithTracker(composer, Loading)(ChildComponent);*/

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllUniversities, fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure } from '../../actions/utilityInfo';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    fetchAllUniversities: () => {
      dispatch(fetchAllUniversities()).payload.then((response) => {
        if (!response.error) {
          dispatch(fetchAllUniversitiesSuccess(response.data));
        } else {
          dispatch(fetchAllUniversitiesFailure(response.error));
        }
      });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    universitiesList: state.utilityInfo.universitiesList
  };
};

const SignupStepper = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default SignupStepper;
