import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './CompleteExchangeForm';

const mapStateToProps = (state) => {
  return{
    universities: state.utilityInfo.universitiesList.universities
  };
};

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const CompleteExchangeForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default CompleteExchangeForm;
