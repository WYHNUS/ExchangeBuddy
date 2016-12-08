import React from 'react';
import Link from 'components/Link';

export default () => (
  <div className="row center-xs" style={{ margin: 40 }}>
    <div className="col-xs-8">
      <h2>404 - Sorry, page not found</h2>
      <Link id="home-button" to="/">Back to home</Link>
    </div>
  </div>
);