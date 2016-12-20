import React from 'react';

import Paper from 'material-ui/Paper';

import { groupPropType } from 'util/propTypes';

const GroupHeader = ({ group }) => (
  <Paper>
    <h1>Your Exchange Group</h1>
    <p>{ group.university.name }</p>
  </Paper>
);

GroupHeader.propTypes = {
  group: groupPropType.isRequired,
};

export default GroupHeader;