import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory }from 'react-router';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import AddSectionDialog from './AddSectionDialog/';

import * as Colors from 'material-ui/styles/colors';
import * as IconsHelper from '../../../../../util/icons';
import * as InfoHelper from '../../../../../util/info';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: "100%",
    marginBottom: 24,
  },
};

const GridItem = ({ about, group, item }) => {
  const goToInfoPg = () => { browserHistory.push(`/group/${group.id}/info/${about}/${item.section.id}`) };

  return (
    <Paper zDepth={2}>
      <GridTile
        className="grid-tile"
        title={ item.section.label }
        subtitle={ InfoHelper.getSectionSubtitle(item, group) }
        cols={ item.isFeatured ? 2 : 1 }
        rows={ item.isFeatured ? 2 : 1 }
        onClick={ goToInfoPg }
        style={{
          backgroundImage: `url('${InfoHelper.getImageUrl(item, 300)}')`
        }}
        actionIcon={ <IconButton>{ IconsHelper.icon("open_in_new", { color: Colors.grey50 }) }</IconButton> } />
    </Paper>
  );
};

const GridItemAdd = ({ onTouchTap }) => (
  <div id="grid-item-add" onTouchTap={onTouchTap} style={{ display: Meteor.user() ? 'inline-block' : 'none' }}>
    <div id="grid-item-add-overlay">
      <span id="grid-item-add-icon">+</span>
      <p>ADD A SECTION</p>
    </div>
  </div>
);

export default class InfoGridList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addSectionDialogOpen: false,
    };
  }

  render() {
    const { about, group, title, items, isMobile } = this.props;

    return (
      <div className="grid-list-container">
        <h3 className="pinline"><span>About { title }</span></h3>
        <p className="small-text" style={{ textAlign: 'center' }}>Click to view more information about each section.</p>

        <GridList
          className="grid-list"
          cols={ isMobile ? 2 : 3 }
          cellHeight={210}
          padding={10}
          style={styles.gridList}>

          { items.map((item, idx) => <GridItem key={idx} about={about} group={group} item={item} />) }

          <GridItemAdd onTouchTap={ () => this.setState({ addSectionDialogOpen: true }) } />

        </GridList>

        <AddSectionDialog
          open={ this.state.addSectionDialogOpen }
          handleClose={ () => this.setState({ addSectionDialogOpen: false }) }
          groupId={ group.id }
          about={about} />
      </div>
    );
  }
}

