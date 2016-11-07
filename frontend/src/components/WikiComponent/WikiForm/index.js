import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
	initializeWikiForm, submitNewSectionVersion
} from '../../../actions/wiki'

// Component
import ChildComponent from './WikiForm';

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
		initializeForm: (title, content) => dispatch(initializeWikiForm(title, content)),
		createVersion: (wikiTitle, sectionIndex, title, content) => {
			dispatch(submitNewSectionVersion(wikiTitle, sectionIndex, title, content));
		},
	};
};

const WikiForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default WikiForm;