import React from 'react';
import { browserHistory } from 'react-router';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

var items = [];
var sectionPrefix = '';

export default class WikiHistoryDropdown extends React.Component {
	constructor(props) {
		super(props);
		const { section } = this.props;
		const { WikiSection } = section;
		items = [];
		sectionPrefix = 'section' + WikiSection.sectionIndex + '=';

		for (var i=1; i<=WikiSection.totalVersionCount; i++) {
			items.push(
				<MenuItem 
					value={ sectionPrefix + i } 
					key={ WikiSection.sectionIndex + i } 
					primaryText={ 'Version: ' +  i } 
				/>
			);
		} 

		this.state = {
			value: sectionPrefix + section.versionNumber
		};
	}

  	handleChange = (event, index, value) => {
  		// redirect
  		const { wikiTitle } = this.props;
  		console.log(wikiTitle);
  		console.log(value);
  		// browserHistory.push('/wiki/' + wikiTitle);
  		this.setState({value});
  	}

	render() {
		const { section } = this.props;

		return (
			<DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange}>
	        	{items}
			</DropDownMenu>
		);
	}
}