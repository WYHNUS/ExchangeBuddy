// load theme styles with webpack 
require('medium-editor/dist/css/medium-editor.min.css');
require('medium-editor/dist/css/themes/default.min.css');
require('medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css');

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';
import { Grid, Row, Col } from 'react-flexbox-grid';
// import RaisedButton from 'material-ui/RaisedButton';

import JournalForm from '../components/JournalForm';
// import TinyMCE from 'react-tinymce';
// import Editor from 'react-medium-editor';

// require('jquery/dist/jquery.min.js');
// require('medium-editor/dist/js/medium-editor.js');
// require('handlebars/dist/handlebars.runtime.min.js');
// require('jquery-sortable/source/js/jquery-sortable-min.js');
// require('blueimp-file-upload/js/vendor/jquery.ui.widget.js');
// require('blueimp-file-upload/js/jquery.iframe-transport.js');
// require('imports?define=>false!blueimp-file-upload/js/jquery.fileupload.js');
// require('medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js');


class Journal extends React.Component{
	constructor(props) {
		super(props);
		// this.handleSubmit = this.handleSubmit.bind(this);
		// this.state = {journalText:"hello world"};
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);	
		// this.journalText = "";

		// this.editor = new MediumEditor('.editable', {imageDragging: false});
		//     $('.editable').mediumInsert({
		//       editor: this.editor,
		//       addons: {
		//         images: {
		//           // deleteScript: '/image/image/files/',
		//           // deleteMethod: 'DELETE',
		//           preview: true,
		//           captions: true,
		//           captionPlaceholder: 'Let\'s blog!',
		//           fileUploadOptions: {
		//             url: '/image',
		//             acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
		//           }
		//         }
		//       }
		//     });
	}

	render() {
		return (
			<div>
				<JournalForm />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility))
	};
};

export default connect(null, mapDispatchToProps)(Journal);