import React from 'react';

import ChildComponent from './SearchBar';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {toggleHomeGroupUniversitySearchList} from '../../../../actions/homeSearchGroups'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleHomeGroupUniversitySearchList:(open)=>dispatch(toggleHomeGroupUniversitySearchList(open))
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);