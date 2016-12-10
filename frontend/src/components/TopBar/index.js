import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleHomeSearchDrawer } from 'actions/HomeSearchDrawer';

// Component
import ChildComponent from './TopBar';

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ toggleHomeSearchDrawer }, dispatch),
  };
};

const TopBar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default TopBar;
