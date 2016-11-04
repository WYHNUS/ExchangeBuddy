import React, {PropTypes} from 'react';

import WikiContentTable from '../WikiContentTable'
import WikiSection from '../WikiSection';

export default class WikiDetail extends React.Component {
	render() {
		const { wiki, sections } = this.props;

		return (
			<div className="wikiDetailWrapper">
				<h1>{ wiki.title }</h1>
				<WikiContentTable sections={ sections }/>

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
