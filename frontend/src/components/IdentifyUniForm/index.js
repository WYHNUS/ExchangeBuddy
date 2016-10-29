import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
  updateUserProfile,
} from '../../actions/user';
import { 
  fetchAllUniversities, fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure 
} from '../../actions/utilityInfo';

// Component
import ChildComponent from './IdentifyUniForm';

// redux
const mapStateToProps = (state) => {
  return {
    universitiesList: state.utilityInfo.universitiesList,
    submitting: state.user.fetchingAuthUpdate,
    error: state.user.error,
    userAuthData: state.user
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
    },
    updateUserProfile: (homeUni, exchangeInfo) => {
      dispatch(updateUserProfile(homeUni, exchangeInfo));
    }
  };
};

const IdentifyUniForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default IdentifyUniForm;