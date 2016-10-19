import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { saveStoryContent, uploadContentToServer, uploadContentSuccess, uploadContentFail } from '../../actions/stories'
// Component
import ChildComponent from './StoryForm';

// redux
const mapStateToProps = (state) => {
  return{
    storyDetails: state.stories.editingStory,
    user: state.user.userObject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    saveContent: (val) => dispatch(saveStoryContent(val)),
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

const StoryForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default StoryForm;