import React from 'react';

import AdminUniversityPanel from '../AdminUniversityPanel';

import { universityPropType, countryPropType } from 'util/propTypes';

const AdminUniversitiesList = ({ universities, ...rest }) => (
  <div className="admin-universities-container" style={{ margin: '20px 0' }}>
    { universities.map((uni, idx) => <AdminUniversityPanel key={ idx } university={ uni } { ...rest } />) }
  </div>
);

AdminUniversitiesList.propTypes = {
  universities: React.PropTypes.arrayOf(universityPropType).isRequired,
};

export default AdminUniversitiesList;