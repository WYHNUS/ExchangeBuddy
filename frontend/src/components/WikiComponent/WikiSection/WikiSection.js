import moment from 'moment';
import $ from 'jquery';

import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';

import WikiHistoryDropdown from '../WikiHistoryDropdown';

export default class WikiSection extends React.Component {
  componentDidMount() {
    const { section } = this.props;
    $('#section' + section.WikiSection.sectionIndex + 'content').append(section.content);
  }

  render() {
    const { wikiTitle, section, userToken } = this.props;
    
    return (
      <div className="wiki-section-wrapper" id={ section.title }>
        <h2>
          <div>
            { section.title }
            {
              userToken ?
                <span className="edit-span" onClick={this.editComponent.bind(this)}><a>[ edit ]</a></span>
              : null
            }
          </div>
          <WikiHistoryDropdown 
            wikiTitle = { wikiTitle }
            section={ section } 
          />
        </h2>
        {
          (section.versionNumber !== section.WikiSection.displayVersionNumber) ?
            <div><p style={{color: 'red'}}>Reminder: This is not the latest version!</p></div>
          : null
        }
        <div id={'section' + section.WikiSection.sectionIndex + 'content'}></div>
      </div>
    );
  }

  editComponent() {
    const { wikiTitle } = this.props;
    const { title, WikiSection } = this.props.section;
    browserHistory.push('/wiki/editWiki/' + wikiTitle + '/' + WikiSection.sectionIndex + '#' + title);
  }
}
