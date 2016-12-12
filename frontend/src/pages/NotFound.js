import React from 'react';
import Link from 'components/Link';
import Icon from 'components/Icon';

import * as Colors from 'material-ui/styles/colors';

export default () => (
  <div className="row center-xs" style={{ margin: 40 }}>
    <div className="col-xs-12 col-sm-8">
      <Icon name="bug_report" size={120} color={ Colors.grey500 } style={{ marginTop: 30 }} />
      <h1 style={{ fontSize: 48, fontWeight: 100, margin: '20px 0' }}>404</h1>
      <p>The page you are looking for cannot be found.</p>
      <p style={{ margin: '20px 0' }}><Link id="home-button" to="/">Back to home</Link></p>
    </div>
  </div>
);