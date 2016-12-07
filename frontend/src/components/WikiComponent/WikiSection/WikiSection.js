import React from 'react';

import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Icon from 'components/Icon';
import Link from 'components/Link';
import AvatarRow from 'components/AvatarRow';
import IconRow from 'components/IconRow';
import WikiHistoryButton from '../WikiHistoryButton';
import WikiForm from '../WikiForm';

import { formatDate, formatDateTime } from 'util/helper';
import * as Colors from 'material-ui/styles/colors';
import { palette } from 'layouts/mui-theme';

import './WikiSection.scss';

export default class WikiSection extends React.Component {
  static propTypes = {
    wiki: React.PropTypes.object.isRequired,
    section: React.PropTypes.object.isRequired,
    userToken: React.PropTypes.string.isRequired,
    isMobile: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      currentDisplayedVersion: props.section.versionNumber,
    };
  }

  render() {
    const { wiki, section, userToken, isMobile } = this.props;
    const { isEditing, currentDisplayedVersion } = this.state;

    const isDisplayingOld = currentDisplayedVersion !== section.WikiSection.displayVersionNumber;
    
    if (isEditing) {

      return (
        <Card className="wiki-section-wrapper">
          <CardText>
            <IconRow 
              className="displaying-old-version"
              icon={ <Icon name="access_time" /> }
              label="You are currently in Edit mode! Click 'Save Changes' to make your contributions, or cancel to return to View mode."
              style={{ marginBottom: 20 }} /> 
            <WikiForm
              wikiName={ wiki.title }
              section={ section }
              closeEditForm={ () => this.setState({ isEditing: false }) } />
          </CardText>
        </Card>
      );

    } else {

      return (
        <Card className="wiki-section-wrapper" initiallyExpanded={ isDisplayingOld || !isMobile }>
          <CardHeader title={ <span className="wiki-section-title">{ section.title }</span> } actAsExpander showExpandableButton />
          <CardText expandable>
            { isDisplayingOld &&
              <IconRow 
                className="displaying-old-version"
                icon={ <Icon name="access_time" /> }
                label={ `Displaying an outdated version from ${ formatDateTime(section.updatedAt) }.` }
                style={{ marginBottom: 20 }} /> 
            }

            <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
          </CardText>
          <CardActions expandable>
            <div className="row start-xs start-sm middle-xs">
              <div className="col-xs-12 col-sm">
                { !isDisplayingOld && userToken && 
                  <IconButton tooltip="Contribute!" onClick={ () => this.setState({ isEditing: true }) }> 
                    <Icon name="edit" color={ palette.primary1Color } />
                  </IconButton>
                }
                <WikiHistoryButton 
                  wiki={ wiki } 
                  section={ section } 
                  setVersion={ version => this.setState({ currentDisplayedVersion: version }) } />
              </div>
              <div className="col-xs-12 col-sm-offset-2 col-sm-4">
                { section.User && 
                  <AvatarRow 
                    avatar={ section.User.profilePictureUrl } 
                    className="last-edited-by" 
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
  }
}
