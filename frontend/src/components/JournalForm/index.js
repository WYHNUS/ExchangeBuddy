import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators

// Component
import ChildComponent from './JournalForm';

// redux
const mapStateToProps = (state) => {
  return{
    journalContent: "initial txt"
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    // saveData: (val) => dispatch(saveSignupPageOneInfo(val)),
  };
};

const JournalForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default JournalForm;
