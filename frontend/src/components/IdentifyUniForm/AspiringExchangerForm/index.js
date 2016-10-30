import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Component
import ChildComponent from './AspiringExchangerForm';

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

const AspiringExchangerForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default AspiringExchangerForm;
