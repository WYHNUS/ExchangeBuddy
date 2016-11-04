import React, {PropTypes} from 'react';

import WikiSection from '../WikiSection';

export default class WikiDetail extends React.Component {
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
										<WikiSection
											wikiTitle={ wiki.title }
											section={ section } 
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
