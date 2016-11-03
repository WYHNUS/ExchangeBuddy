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

	render() {
		const { section } = this.props;

		return (
			<div className="wikiSectionWrapper" id={ section.WikiSection.name }>
				<h2>{ section.WikiSection.name }</h2>
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
		const { wiki, sections } = this.props;

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
												<span class="contentNumber">{ section.WikiSection.sectionIndex }</span>
												<span class="contentText">{ section.WikiSection.name }</span>
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
										<Section section={ section } key={ idx } />
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
