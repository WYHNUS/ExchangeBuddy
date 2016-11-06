import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { setReload, fetchWikiPage } from '../../../actions/wiki';

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

		var queryArray = [];
  		var urlString = '/wiki/history/' + wikiTitle + '/';

  		for (var i=0; i<sections.length; i++) {
  			var section = sections[i];
  			var	versionString = ('section' + section.WikiSection.sectionIndex 
  										+ '=' + section.versionNumber);	

  			// check if chosen section number 
  			if (value.substring(7, 8) === ('' + section.WikiSection.sectionIndex)) {
  				versionString = value;
  				queryArray.push({ 
					sectionIndex: value.substring(7, 8), 
					versionIndex: value.substring(value.indexOf('=') + 1)
				});
  			} else {
	  			queryArray.push({ 
					sectionIndex: section.WikiSection.sectionIndex, 
					versionIndex: section.versionNumber
				});
	  		}
  			var section = sections[i];

  			if (i === 0) {
  				urlString += versionString;
  			} else {
	  			urlString += ('&' + versionString);
  			}
  		}

  		browserHistory.push(urlString);
  		this.props.fetchWikiPage(wikiTitle, queryArray);
  	}

	render() {
		const { section } = this.props;

		return (
			<DropDownMenu className="dropdown-menu" maxHeight={300} value={this.state.value} onChange={this.handleChange}>
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
		actions: bindActionCreators({  }, dispatch),
		setReload: () => dispatch(setReload()),
		fetchWikiPage: (title, paramArray) => dispatch(fetchWikiPage(title, paramArray)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiHistoryDropdown);