var moment=require('moment');

import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';

import { formatTime } from '../../../util/helper';
import * as UserHelper from '../../../util/user';

class Section extends React.Component {
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


export default class WikiDetail extends React.Component {
	componentWillMount() {
		//this.props.fetchStory(this.props.id, this.props.user.id);
	}

	componentDidMount() {
		// $('#content').append(this.props.storyDetails.content);
	}

	render() {
		const { wiki, sections, userToken } = this.props;

		return (
			<div className="wikiDetailWrapper">
				<h1>{ wiki.title }</h1>
				{
					(sections.length > 0) ?
						<div className="wikiContentTable">
							<h2>Contents</h2>
							<ul>
							{(
								sections.map(function(section, idx){
									return (
										<li key={ idx }>
											<a href={ "#" + section.WikiSection.name }>
												<span className="contentNumber">{ section.WikiSection.sectionIndex }</span>
												<span className="contentText">{ section.WikiSection.name }</span>
											</a>
										</li>
									) 
								})
							)}
							</ul>
						</div>
					: null
				}

				<div>
					{ 
						(sections.length > 0) ?
							(
								sections.map(function(section, idx){
									return (
										<Section
											wikiTitle={ wiki.title }
											section={ section } 
											userToken={ userToken } 
											key={ idx } 
										/>
									) 
								})
							)
						: null
					}
				</div>
			</div>
		);
	}
}


WikiDetail.propTypes = {
	wiki: PropTypes.object.isRequired,
	sections: PropTypes.array.isRequired
};
