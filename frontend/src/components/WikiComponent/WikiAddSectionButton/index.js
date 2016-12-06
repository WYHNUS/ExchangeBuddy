import React from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

export default class WikiAddSectionButton extends React.Component {
  render() {
    return (
      <div className="row center-md center-xs" style={{ margin: '30px 0' }}>
        <div>
          <RaisedButton className="raised-btn" label="Add a new Section" primary onClick={this.redirectToAddSection.bind(this)} />
        </div>
      </div>
    );
  }

  redirectToAddSection() {
    const { wikiTitle } = this.props;
    browserHistory.push('/wiki/newSection/' + wikiTitle);
  }
}