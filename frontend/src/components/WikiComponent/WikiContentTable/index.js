import React from 'react';

export default class WikiContentTable extends React.Component {
	render() {
		const { sections } = this.props;
		return (
			<div>
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
			</div>
		);
	}
}