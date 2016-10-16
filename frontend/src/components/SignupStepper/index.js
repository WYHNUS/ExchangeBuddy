import React from 'react';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { fetchAllUniversities, fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure } from '../../actions/utilityInfo';
// Component
import ChildComponent from './SignupStepper';

const mapStateToProps = (state) => {
  return {
    universitiesList: state.utilityInfo.universitiesList
  };
};

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

const SignupStepper = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default SignupStepper;
