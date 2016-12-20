import React from 'react';

import Paper from 'components/Paper';
import AvatarRow from 'components/AvatarRow';

import { groupPropType } from 'util/propTypes';
import { formatMonth } from 'util/helper';

import './GroupHeader.scss';

const GroupHeader = ({ group: { university, month, year } }) => (
  <Paper>
    <AvatarRow avatar={ university.logoImageUrl } size={80} className="group-header">
      <h1>Your Exchange Group</h1>
      <p>Exchangers to { university.name }, { formatMonth(month) } { year }</p>
    </AvatarRow>
  </Paper>
);

GroupHeader.propTypes = {
  group: groupPropType.isRequired,
};

export default GroupHeader;