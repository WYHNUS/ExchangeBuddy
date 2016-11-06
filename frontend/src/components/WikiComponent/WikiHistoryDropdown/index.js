import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

var items = [];
var sectionPrefix = '';

class WikiHistoryDropdown extends React.Component {
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
  		const { wikiTitle, sections } = this.props;

  		var urlString = '/wiki/history/' + wikiTitle + '/';
  		for (var i=0; i<sections.length; i++) {
  			var section = sections[i];
  			var	versionString = ('section' + section.WikiSection.sectionIndex 
  										+ '=' + section.versionNumber);	

  			// check if chosen section number 
  			if (value.substring(7, 8) === ('' + section.WikiSection.sectionIndex)) {
  				versionString = value
  			}

  			if (i === 0) {
  				urlString += versionString;
  			} else {
	  			urlString += ('&' + versionString);
  			}
  		}

  		console.log(urlString);
  		browserHistory.push(urlString);
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


const mapStateToProps = (state) => {
	return {
		sections: state.wiki.sections
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({  }, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiHistoryDropdown);