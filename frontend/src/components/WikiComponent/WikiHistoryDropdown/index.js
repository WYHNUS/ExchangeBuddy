import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

var items = [];
export default class WikiHistoryDropdown extends React.Component {
	constructor(props) {
		super(props);
		const { section } = this.props;

		items = [];
		for (var i=1; i<=section.WikiSection.totalVersionCount; i++) {
			items.push(
				<MenuItem 
					value={ i } 
					key={ section.WikiSection.sectionIndex + i } 
					primaryText={ 'Version: ' +  i } 
				/>
			);
		} 

		this.state = {
			value: section.versionNumber
		};
	}

  	handleChange = (event, index, value) => {
  		console.log(index);
  		console.log(value);
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