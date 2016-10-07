// load theme styles with webpack 
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import Editor from 'react-medium-editor';

class Journal extends React.Component{
	constructor(props) {
		super(props);
		this.state = { text: 'Blog something! XD' };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		// TODO: send request to the server
	}

	render() {
		return (
			<div>
				<form onSubmit={ this.handleSubmit }>
			        <Editor
			          text={this.state.text}
			          options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
			        />
			        <div className="row center-md center-xs" style={{marginTop: "18px"}}>
				        <Col xs={8} md={3} className="info-container-col">
					        <RaisedButton className="raised-btn" label="Submit" primary={true} type="submit"/>
					    </Col>
					    <Col xs={8} md={3} className="info-container-col">
					        <RaisedButton className="raised-btn" label="Cancel" primary={true} type="cancel"/>
				        </Col>
			        </div>
		        </form>
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