import React from 'react';

// Component
import ChildComponent from './WikiSection';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		userToken: state.user.token
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);