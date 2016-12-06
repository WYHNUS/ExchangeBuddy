import React from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Icon from 'components/Icon';
import Link from 'components/Link';
import AvatarRow from 'components/AvatarRow';
import WikiHistoryButton from '../WikiHistoryButton';

import { formatDate, formatDateTime } from 'util/helper';
import * as Colors from 'material-ui/styles/colors';
import { palette } from 'layouts/mui-theme';

import './WikiSection.scss';

export default class WikiSection extends React.Component {
  static propTypes = {
    wiki: React.PropTypes.object.isRequired,
    section: React.PropTypes.object.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      currentDisplayedVersion: props.section.WikiSection.displayVersionNumber,
    };
  }

  render() {
    const { wiki, section, userToken, isMobile } = this.props;
    const { isEditing, currentDisplayedVersion } = this.state;
    
    return (
      <Card className="wiki-section-wrapper" initiallyExpanded={ !isMobile }>
        <CardHeader title={ <span className="wiki-section-title">{ section.title }</span> } actAsExpander showExpandableButton />
        <CardText expandable>
          { currentDisplayedVersion !== section.WikiSection.displayVersionNumber &&
            <p className="displaying-old-version">Displaying an outdated version from { formatDateTime(section.updatedAt) }</p> }

          <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
        </CardText>
        <CardActions expandable>
          <div className="row start-xs start-sm middle-xs">
            <div className="col-xs-12 col-sm">
              { userToken && 
                <IconButton tooltip="Contribute!" onClick={ this.editComponent.bind(this) }> 
                  <Icon name="edit" color={ palette.primary1Color } />
                </IconButton>
              }
              <WikiHistoryButton section={ section } setVersion={ version => this.setState({ currentDisplayedVersion: version }) } />
            </div>
            <div className="col-xs-12 col-sm-offset-2 col-sm-4">
              { section.User && 
                <AvatarRow 
                  className="last-edited-by" 
                  avatar={ section.User.profilePictureUrl } 
                  size={24} 
                  style={{ alignItems: 'center' }}
                  bodyStyle={{ paddingLeft: 0 }}>
                  Last updated by <Link to={ `/profile/${ section.User.id }` }>{ section.User.name }</Link> on { formatDate(section.updatedAt) }
                </AvatarRow> 
              }
            </div>
          </div>
        </CardActions>
      </Card>
    );
  }

  editComponent() {
    const { wikiTitle } = this.props;
    const { title, WikiSection } = this.props.section;
    browserHistory.push('/wiki/editWiki/' + wikiTitle + '/' + WikiSection.sectionIndex + '#' + title);
  }
}
