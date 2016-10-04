import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../Loading';
import { browserHistory } from 'react-router';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { showSnackbar } from '../../actions/snackbar';
import { openSwitchGroupDialog } from '../../actions/switchGroupDialog';

// Component
import ChildComponent from './Header';


const mapStateToProps = (state)=>{
  return {
    params: state.home.homeCountry,
    tab: state.home.homeCountry
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar, openSwitchGroupDialog }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
