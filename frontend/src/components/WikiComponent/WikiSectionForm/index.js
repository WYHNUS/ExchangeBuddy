import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
	submitNewSection
} from 'actions/wiki'

// Component
import ChildComponent from './WikiSectionForm';

// redux
const mapStateToProps = (state) => {
	return{
		submitting: state.wiki.submitting,
		error: state.wiki.uploadError,
		uploadSuccess: state.wiki.uploadSuccess,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch),
		createSection: (wikiTitle, versionTitle, content) => {
			dispatch(submitNewSection(wikiTitle, versionTitle, content));
		},
	};
};

const WikiSectionForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default WikiSectionForm;