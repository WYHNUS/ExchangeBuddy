import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { saveJournalContent } from '../../actions/stories'
// Component
import ChildComponent from './JournalForm';

// redux
const mapStateToProps = (state) => {
  return{
    journalContent: state.stories.editingJournal.content
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    saveContent: (val) => dispatch(saveJournalContent(val)),
  };
};

const JournalForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default JournalForm;
