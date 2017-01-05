import React from 'react';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'components/Paper';

import { groupPropType } from 'util/propTypes';
import { formatMonth } from 'util/helper';

import './GroupHeader.scss';

const GroupHeader = ({ group: { exchange: { university, month, year } } }) => (
  <Paper>
    <ListItem 
      disabled
      leftAvatar={ <Avatar src={ university.logoImageUrl } /> } 
      primaryText={ `Exchangers to ${ university.name }` } 
      secondaryText={ `${ formatMonth(month) } ${ year }` } />
  </Paper>
);

GroupHeader.propTypes = {
  group: groupPropType.isRequired,
};

export default GroupHeader;