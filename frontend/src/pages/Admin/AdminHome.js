import React from 'react';

import AdminDashboardButton from 'components/Admin/AdminDashboardButton';

const AdminHome = () => (
  <div className="admin-home container">
    <div className="row">
      <div className="col-xs">
        <h1>Admin Dashboard</h1>

        <div className="admin-dashboard-container">
          <AdminDashboardButton icon="school" label="Manage Universities" description="Create and update universities here." link="/admin/universities" />
        </div>
      </div>
    </div>
  </div>
);

export default AdminHome;