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
    userToken: state.user.token,
    wiki: state.wiki,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const WikiForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default WikiForm;