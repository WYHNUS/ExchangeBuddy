import React from 'react';

import AdminUniversityPanel from '../AdminUniversityPanel';

import { universityPropType } from 'util/propTypes';

const AdminUniversitiesList = ({ universities, ...rest }) => (
  <div className="admin-universities-container" style={{ margin: '20px 0' }}>
    { universities.map((uni, idx) => <AdminUniversityPanel key={ idx } form={`AdminUniversityPanel_${ idx }`} university={ uni } { ...rest } />) }
  </div>
);

AdminUniversitiesList.propTypes = {
  universities: React.PropTypes.arrayOf(universityPropType).isRequired,
};

export default AdminUniversitiesList;