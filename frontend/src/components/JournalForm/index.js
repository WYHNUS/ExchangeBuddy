import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { saveJournalContent, uploadContentToServer, uploadContentSuccess, uploadContentFail } from '../../actions/stories'
// Component
import ChildComponent from './JournalForm';

// redux
const mapStateToProps = (state) => {
  return{
    journalDetails: state.stories.editingJournal,
    user: state.user.userObject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    saveContent: (val) => dispatch(saveJournalContent(val)),
    uploadContent: (content) => {
      dispatch(uploadContentToServer(content)).then((response) => {
        console.log(response);
        if (!response.error) {
          dispatch(uploadContentSuccess(response.data));
        } else {
          dispatch(uploadContentFail(response.error));
        }
      })
    },
  };
};

const JournalForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default JournalForm;
