import React from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import AdminUniversityForm from '../AdminUniversityForm';

import { universityPropType } from 'util/propTypes';

const AdminUniversityPanel = ({ university, ...rest }) => {
  const { name, city, logoImageUrl } = university;

  return (
    <Card className="admin-university-panel" style={{ textAlign: 'left' }}>
      <CardHeader title={ name } subtitle={ city } avatar={ logoImageUrl && <Avatar src={ logoImageUrl } /> } actAsExpander showExpandableButton />
      <CardText expandable>
        <AdminUniversityForm university={ university } { ...rest } />
      </CardText>
    </Card>
  );
};

AdminUniversityPanel.propTypes = {
  university: universityPropType.isRequired,
};

export default AdminUniversityPanel;