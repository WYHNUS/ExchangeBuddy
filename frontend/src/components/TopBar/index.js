import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleHomeSearchDrawerVisibility } from '../../actions/pageVisibility';

// Component
import ChildComponent from './TopBar';

const mapStateToProps = (state) => {
  return {
    pageVisibility: state.pageVisibility
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHomeSearchDrawerVisibility: visibility=>dispatch(toggleHomeSearchDrawerVisibility(visibility))
  };
};

const TopBar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default TopBar;
