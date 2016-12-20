import React from 'react';

import WikiDetail from 'components/WikiComponent/WikiDetail';

const WikiDetails = ({ params }) => (
  <WikiDetail wikiTitle={ params.wikiTitle } />
);

WikiDetails.propTypes = {
  params: React.PropTypes.shape({
    wikiTitle: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default WikiDetails;