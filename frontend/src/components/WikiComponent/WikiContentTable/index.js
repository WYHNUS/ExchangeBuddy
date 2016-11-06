import React from 'react';

export default class WikiContentTable extends React.Component {
	render() {
		const { sections } = this.props;
		return (
			<div>
			{
				(sections.length > 0) ?
					<div className="wiki-content-table">
						<h2>Contents</h2>
						<ul>
						{(
							sections.map(function(section, idx){
								return (
									<li key={ idx }>
										<a href={ "#" + section.title }>
											<span className="content-number">{ section.WikiSection.sectionIndex }</span>
											<span className="content-text">{ section.title }</span>
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