import React from 'react';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Icon from 'components/Icon';

import { iterate } from 'util/helper';
import * as Colors from 'material-ui/styles/colors';

class WikiHistoryDropdown extends React.Component {
  static propTypes = {
    fetchWikiPage: React.PropTypes.func.isRequired,
    setVersion: React.PropTypes.func.isRequired,
    wiki: React.PropTypes.object.isRequired,
    section: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { wiki, section, setVersion, fetchWikiPage } = this.props;
    const { isOpen } = this.state;

    const openDialog = () => this.setState({ isOpen: true });
    const closeDialog = () => this.setState({ isOpen: false });

    const handleSelectVersion = (version) => () => {
      fetchWikiPage(wiki.title, [{ sectionIndex: section.WikiSection.sectionIndex, versionIndex: version }]);
      setVersion(version);
      closeDialog();
    };

    return (
      <IconButton 
        tooltip="Version History" 
        color={ Colors.grey500 }
        onClick={ openDialog }>

        <Icon name="history" color={ Colors.grey500 } />

        <Dialog
          open={ isOpen } 
          className="version-history-dialog" 
          title="View Version History"
          onRequestClose={ closeDialog }>
          <List>
            { iterate(section.WikiSection.totalVersionCount).map(i => i + 1)
              .map(i => <ListItem key={ i } primaryText={ `Version ${ i }` } onClick={ handleSelectVersion(i) } />) }
          </List>
        </Dialog>
        
      </IconButton>
    );
  }
}

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWikiPage } from 'actions/wiki';

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ fetchWikiPage }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(WikiHistoryDropdown);