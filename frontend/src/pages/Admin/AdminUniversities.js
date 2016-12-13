import React from 'react';

import AdminUniversities from 'components/Admin/AdminUniversities';

export default () => (
  <div className="admin-universities container">
    <div className="row start-xs">
      <div className="col-xs">
        <h1>Manage Universities</h1>
        <AdminUniversities />
      </div>
    </div>
  </div>
);