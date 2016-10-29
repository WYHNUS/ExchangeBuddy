import React from 'react';
import Loading from '../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './ProfilePaper';

import { fetchProfileSuccess, fetchProfileFailure } from '../../actions/profile';
import { fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure } from '../../actions/utilityInfo';
import { attemptLogout, clearUser } from '../../actions/authActions'
import { showSnackbar } from '../../actions/messageSnackbar';

// redux
const mapStateToProps = (state) => {
  return {
    profile: state.profile.userProfile.userProfile,
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
    },
    attemptLogout: () => {
      dispatch(attemptLogout());
    },
    clearUser: () => {
      dispatch(clearUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
