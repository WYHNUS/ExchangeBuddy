import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class WikiRecommendation extends React.Component {
	getComponent(wikiTitle) {
        browserHistory.push('/wiki/' + wikiTitle);
    }

    render() {
		const { previewItem } = this.props;
		
		return (
			<li className="recommendation-item">
				<div 
					className="recommendation-item-wrapper" 
					onClick={this.getComponent.bind(this, previewItem.name)}
				>
					<img src={ previewItem.imageUrl } />
				    <p>{ previewItem.name }</p>
				</div>
			</li>
		)
	}
}