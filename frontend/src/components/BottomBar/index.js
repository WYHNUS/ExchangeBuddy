import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChildComponent from './BottomBar';

import { toggleHomeTab } from 'actions/home';

const mapStateToProps = (state, ownProps)=>{
  return {

  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ toggleHomeTab }, dispatch),
  };
};


const BottomBar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default BottomBar;