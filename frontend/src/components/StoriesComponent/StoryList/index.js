import React from 'react';

// Component
import ChildComponent from './StoryList';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch)
	};
};

const mapStateToProps = (state) => {
	return {
		stories:state.stories.storyList.storyList,
		user:state.user.userObject

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
