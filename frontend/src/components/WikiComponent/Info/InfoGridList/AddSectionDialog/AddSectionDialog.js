import React from 'react';
import Dialog from 'material-ui/Dialog';
import { browserHistory }from 'react-router';
import { GridList, GridTile } from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

import * as Colors from 'material-ui/styles/colors';
import * as IconsHelper from '../../../../../../util/icons';
import * as InfoHelper from '../../../../../../util/info';

const styles = {
  gridList: {
    width: "100%",
    marginBottom: 24,
  },
};

const GridItem = ({ about, group, section }) => {
  const goToEditPg = () => { browserHistory.push(`/group/${group.id}/info/${about}/${section.id}/edit`) };

  return (
    <Paper zDepth={2}>
      <GridTile
        className="grid-tile"
        title={ section.label }
        subtitle={ InfoHelper.getSectionSubtitle({ section }, group) }
        onClick={ goToEditPg }
        style={{
          backgroundImage: `url('${InfoHelper.getImageUrl({ section }, 300)}')`
        }}
        actionIcon={ <IconButton>{ IconsHelper.icon("add_circle", { color: Colors.grey50 }) }</IconButton> } />
    </Paper>
  );
};

const AddSectionDialog = ({ open, handleClose, group, about, sections, isMobile }) => {
  const actions = [
    <FlatButton label="cancel" onTouchTap={ handleClose } />
  ];

  return (
    <Dialog
      open={ open }
      onRequestClose={ handleClose }
      title="Add a Section"
      subtitle="Select a section to add to ExchangeBuddy."
      actions={ actions }
      className="add-section-dialog"
      bodyStyle={{ overflowY: "auto" }} >

      <GridList
        className="grid-list"
        cols={ isMobile ? 2 : 3 }
        cellHeight={210}
        padding={10}
        style={ styles.gridList }>

        { sections.map((section, idx) => <GridItem key={idx} about={about} group={group} section={section} />) }

      </GridList>

    </Dialog>
  );
};

export default AddSectionDialog;
