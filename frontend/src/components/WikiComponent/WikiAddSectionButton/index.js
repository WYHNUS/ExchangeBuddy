import React from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class WikiAddSectionButton extends React.Component {
	redirectToAddSection() {
		const { wikiTitle } = this.props;
		browserHistory.push('/wiki/newSection/' + wikiTitle);
	}

	render() {
		return (
			<div className="row center-md center-xs" style={{marginTop: "50px"}}>
	            <div>
	                <RaisedButton className="raised-btn" label="Add a new Section" primary={true}
	                    onClick={this.redirectToAddSection.bind(this)}
	                />
	            </div>
	        </div>
        )
	}
}