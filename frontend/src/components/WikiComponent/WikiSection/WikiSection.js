var moment=require('moment');

import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';

export default class WikiSection extends React.Component {
	componentDidMount() {
		const { section } = this.props;
		$('#section' + section.WikiSection.sectionIndex + 'content').append(section.content);
	}

	editComponent() {
		const { wikiTitle, section } = this.props;
        browserHistory.push('/wiki/editWiki/' + wikiTitle + '/' + section.WikiSection.sectionIndex);
	}

	render() {
		const { section, userToken } = this.props;
		return (
			<div className="wikiSectionWrapper" id={ section.WikiSection.name }>
				<h2>
					{ section.WikiSection.name }
					{
						userToken ?
							<span onClick={this.editComponent.bind(this)}><a>[ edit ]</a></span>
						: null
					}
				</h2>
				<div id={"section" + section.WikiSection.sectionIndex + "content"}></div>
			</div>
		);
	}
}
