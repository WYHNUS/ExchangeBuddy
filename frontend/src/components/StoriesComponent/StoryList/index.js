import React from 'react';

// Component
import ChildComponent from './StoryList';

// Action creators
import { fetchAllStories, fetchAllStoriesSuccess, fetchAllStoriesFailure } from '../../../actions/stories';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch),
		fetchAllStories: () => {
	    	dispatch(fetchAllStories());//.then((response) => {
	  //   		console.log(response);
		 //        if (!response.error) {
		 //        	dispatch(fetchAllStoriesSuccess(response.data));
		 //        } else {
		 //        	dispatch(fetchAllStoriesFailure(response.error));
		 //        }
			// });
	    }
	};
};

const mapStateToProps = (state) => {
	return {
		stories:state.stories.storyList,
		user:state.user.userObject
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
