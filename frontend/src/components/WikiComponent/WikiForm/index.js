import React from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { 
	initializeWikiForm
  // saveStoryContent, resetEditingStory,
  // uploadContentToServer, uploadContentSuccess, uploadContentFail 
} from '../../../actions/wiki'

// Component
import ChildComponent from './WikiForm';

// redux
const mapStateToProps = (state) => {
	return{
		userToken: state.user.token,
		wiki: state.wiki,
		formValue: state.wiki.editingSection,
		initialValues: {
			sectionTitle: state.wiki.editingSection.title,
			sectionContent: state.wiki.editingSection.content
		}
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch),
		initializeForm: (title, content) => dispatch(initializeWikiForm(title, content)),
	};
};

const WikiForm = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default WikiForm;