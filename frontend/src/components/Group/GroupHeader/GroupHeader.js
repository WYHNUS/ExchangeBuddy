import React from 'react';

import Paper from 'components/Paper';
import AvatarRow from 'components/AvatarRow';

import { groupPropType } from 'util/propTypes';
import { formatMonth } from 'util/helper';

import './GroupHeader.scss';

const GroupHeader = ({ isMobile, group: { university, month, year } }) => (
  <Paper>
    <AvatarRow avatar={ university.logoImageUrl } size={ isMobile ? 40 : 80} className="group-header">
      <h2>Your Exchange Group</h2>
      <p>Exchangers to { university.name }, { formatMonth(month) } { year }</p>
    </AvatarRow>
  </Paper>
);

GroupHeader.propTypes = {
  group: groupPropType.isRequired,
  isMobile: React.PropTypes.bool.isRequired,
};

export default GroupHeader;