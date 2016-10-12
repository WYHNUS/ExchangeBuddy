import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChildComponent from './BottomBar';

import { toggleBottomBarVisibility } from '../../actions/pageVisibility';
import {toggleHomeTab} from '../../actions/home';

const mapStateToProps = (state)=>{
  return {
    pageVisibility: state.pageVisibility
  };
}
const mapDispatchToProps = (dispatch) => {
	return {
		toggleHomeTab: tabValue=>dispatch(toggleHomeTab(tabValue))
	};
};


const BottomBar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default BottomBar;