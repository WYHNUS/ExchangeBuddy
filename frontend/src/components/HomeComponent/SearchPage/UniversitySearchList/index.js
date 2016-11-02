import React from 'react';

import ChildComponent from './UniversitySearchList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);