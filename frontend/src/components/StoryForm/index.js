import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
  saveStoryContent, resetEditingStory,
  uploadContentToServer, uploadContentSuccess, uploadContentFail 
} from 'actions/stories'
// Component
import ChildComponent from './StoryForm';

// redux
const mapStateToProps = (state) => {
  return{
    error: state.stories.error,
    uploading: state.stories.uploading,
    published: state.stories.published,
    storyDetails: state.stories.editingStory,
    user: state.user.userObject,
    isLoggedin: state.user.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    saveContent: (val) => dispatch(saveStoryContent(val)),
    uploadContent: (title, content, id) => {
      dispatch(uploadContentToServer(title, content, id));
    },
    cleanUp: () => dispatch(resetEditingStory())
  };
};

const StoryForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default StoryForm;