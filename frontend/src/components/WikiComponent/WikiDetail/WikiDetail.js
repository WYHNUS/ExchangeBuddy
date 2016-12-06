import React, {PropTypes} from 'react';

import WikiSection from '../WikiSection';
import WikiAddSectionButton from '../WikiAddSectionButton';

const WikiDetail = ({ wiki, sections }) => (
  <div className="container">
    <div className="row">
      <div className="col-xs wiki-detail-wrapper">
        <h1>{ wiki.title }</h1>
        <h4>All information is contributed by people like you!</h4>
        
        { sections.length > 0 && sections.map((section, idx) => 
          <WikiSection wiki={ wiki } section={ section } key={ idx } />
        ) }

        <WikiAddSectionButton wikiTitle={ wiki.title } />
      </div>
    </div>
  </div>
);

WikiDetail.propTypes = {
  wiki: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired
};

export default WikiDetail;