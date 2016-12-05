import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

export default class WikiRecommendation extends React.Component {
  render() {
    const { previewItem } = this.props;
    
    return (
      <li className="recommendation-item">
        <div 
          className="recommendation-item-wrapper" 
          onClick={this.getComponent.bind(this, previewItem.name)}>
          { previewItem.imageUrl 
            ? <img src={ previewItem.imageUrl } />
            : <img src="http://pix.iemoji.com/images/emoji/apple/ios-9/256/earth-globe-americas.png" />
          }
          <p>{ previewItem.name }</p>
        </div>
      </li>
    )
  }

  getComponent(wikiTitle) {
    browserHistory.push('/wiki/' + wikiTitle);
  }
}