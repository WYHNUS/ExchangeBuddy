import React from 'react';

import WikiRecommendationList from 'components/WikiComponent/WikiRecommendationList';

export default class Wiki extends React.PureComponent {
  // if user is signedin, display wiki related to his home and exchange Universities
  // as well as the related two Countries as Recommendation
  // otherwise display mostly viewed wiki OR Singapore and NUS as default (for now...)
  // later maybe can use user's location to give suggestions?
  render() {
    return (
      <div className="container">
        <div className="wiki-recommendation-wrapper">
          <div className="recommendation-nav-bar center-xs">
            <h2>WikiExchange</h2>
          </div>
          <hr className="green-separator" style={{ width: '85%' }}></hr>

          <WikiRecommendationList />

        </div>
      </div>
    );
  }
}