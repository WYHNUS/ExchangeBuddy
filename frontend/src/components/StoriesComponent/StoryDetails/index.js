import React from 'react';

// Component
import ChildComponent from './StoryDetails';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch)
	};
};

const mapStateToProps = (state) => {
	return {
		storyDetails: state.stories.storyDetails.storyDetails,
		user:state.user.userObject
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);