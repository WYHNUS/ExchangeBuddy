import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators

// Component
import ChildComponent from './ExchangeTermSelect';

const mapStateToProps = (state) => {
  return{
    exchangeUniName: state.user.signupInfo.exchangeUniName
  };
};

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const ExchangeTermSelect = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default ExchangeTermSelect;
