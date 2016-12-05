import React from 'react';

// Component
import ChildComponent from './StoryList';

// Action creators
import { fetchAllStories, fetchAllStoriesSuccess, fetchAllStoriesFailure } from 'actions/stories';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import stories from 'util/storyData';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    fetchAllStories: () => {
        dispatch(fetchAllStories());
      }
  };
};

const mapStateToProps = (state) => {
  return {
    stories: state.stories.storyList,
    //stories: stories,
    user: state.user.userObject
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
