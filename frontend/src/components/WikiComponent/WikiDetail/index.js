import React from 'react';

// Component
import ChildComponent from './WikiDetail';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		wiki: state.wiki.wiki,
		sections: state.wiki.sections,
		userToken: state.user.token
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);