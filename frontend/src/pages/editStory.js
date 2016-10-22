// load theme styles with webpack 
// require('medium-editor/dist/css/medium-editor.min.css');
// require('medium-editor/dist/css/themes/default.min.css');
// require('medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css');

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
toggleTopBarSettingsButtonVisibility } from '../actions/pageVisibility';
import { Grid, Row, Col } from 'react-flexbox-grid';

import StoryForm from '../components/StoryForm';

// require('jquery/dist/jquery.min.js');
// require('medium-editor/dist/js/medium-editor.js');
// require('handlebars/dist/handlebars.runtime.min.js');
// require('jquery-sortable/source/js/jquery-sortable-min.js');
// require('blueimp-file-upload/js/vendor/jquery.ui.widget.js');
// require('blueimp-file-upload/js/jquery.iframe-transport.js');
// require('imports?define=>false!blueimp-file-upload/js/jquery.fileupload.js');
// require('medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js');


class Story extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);	
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(true);
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

	componentWillUnmount(){
		this.props.toggleTopBarSettingsButtonVisibility(false);
	}

	render() {
		return (
			<div>
				<StoryForm />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility))
	};
};

export default connect(null, mapDispatchToProps)(Story);