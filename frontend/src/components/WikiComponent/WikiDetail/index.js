import React from 'react';

// Component
import ChildComponent from './WikiDetail';

// Action creators
// import { fetchOneStory, fetchStorySuccess, fetchStoryFail } from '../../../actions/stories';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		//storyDetails: state.stories.storyDetails,
		// storyDetails: stories[parseInt(state.routing.locationBeforeTransitions.pathname.split("/")[2])],
		// fetching_result: state.stories.fetching_result,
		// user: state.user.userObject,
		// id: parseInt(state.routing.locationBeforeTransitions.pathname.split("/")[2])
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch),
		// fetchStory: (storyId, userId) => {
	 //    	dispatch(fetchOneStory(storyId, userId));
	 //    },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);