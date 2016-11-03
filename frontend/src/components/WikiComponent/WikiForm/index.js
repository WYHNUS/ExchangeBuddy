import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
// import { 
//   saveStoryContent, resetEditingStory,
//   uploadContentToServer, uploadContentSuccess, uploadContentFail 
// } from '../../actions/stories'

// Component
import ChildComponent from './WikiForm';

// redux
const mapStateToProps = (state) => {
  return{
    wiki: state.wiki.wiki,
    sections: state.wiki.sections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const WikiForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default WikiForm;