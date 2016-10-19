import React from 'react';

// Component
import ChildComponent from './StoryDetails';

// Action creators
import { fetchOneStory, fetchStorySuccess, fetchStoryFail } from '../../../actions/stories';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch),
		fetchStory: (storyId, userId) => {
	    	dispatch(fetchOneStory(storyId, userId));
	    }
	};
};

const mapStateToProps = (state) => {
	return {
		storyDetails: state.stories.storyDetails,
		user:state.user.userObject
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);