import React from 'react';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';

import AddGroupForm from '../SignupStepper/AddGroupForm';

import * as Colors from 'material-ui/styles/colors';
import * as UniversityHelper from '../../../util/university';

const DialogListItem = ({ group, handleClose }) => {
  const goToGroup = () => { browserHistory.push(`/group/${group.id}`); handleClose(); };

  return (
    <ListItem
      primaryText={ `${group.year} ${group.term} - ${group.university.name}` }
      leftAvatar={ UniversityHelper.getImage(group.university, 40) }
      onTouchTap={ goToGroup } />
  );
};

const SwitchGroupDialog = ({ open, actions, user, groups, universities }) => {
  const handleClose = actions.closeSwitchGroupDialog;

  const newGroupAdded = (group) => {
    actions.closeSwitchGroupDialog();
    actions.showSnackbar("Successfully added group.");
    browserHistory.push(`/group/${group.id}`);
  };

  if (!user || !groups.length)
    return null;

  return (
    <Dialog
      open={ open }
      onRequestClose={ handleClose }
      bodyStyle={{ overflowY: "auto" }}>

      <h2>Switch Group</h2>
      <p style={{ color: Colors.grey700 }}>Easily switch between your exchange groups on ExchangeBuddy.</p>

      <List>
        { groups.map((group, idx) => <DialogListItem key={idx} group={group} handleClose={handleClose} />) }
      </List>

      <h2>Join Another Group</h2>
      <p style={{ color: Colors.grey700 }}>Going on another exchange? Find your group here!</p>

      <AddGroupForm submitFormHandler={ newGroupAdded } />

    </Dialog>
  );
};

export default SwitchGroupDialog;
