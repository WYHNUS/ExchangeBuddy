import React from 'react';
import WikiRecommendation from 'components/WikiComponent/WikiRecommendation';

const WikiRecommendationList = ({ recommendedWikis }) => (
  <div className="recommendation-item-list">
    { recommendedWikis.map((wikiPreview, idx) => <WikiRecommendation previewItem={ wikiPreview } key={ idx } /> ) }
  </div>
);

WikiRecommendationList.propTypes = {
  recommendedWikis: React.PropTypes.array.isRequired,
};

export default WikiRecommendationList;