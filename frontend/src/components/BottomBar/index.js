import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChildComponent from './BottomBar';

import { toggleBottomBarVisibility } from '../../actions/pageVisibility';

const mapStateToProps = (state)=>{
  return {
    pageVisibility: state.pageVisibility
  };
}

const BottomBar = connect(mapStateToProps, null)(ChildComponent);

export default BottomBar;