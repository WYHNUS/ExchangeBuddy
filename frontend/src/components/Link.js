import React from 'react';
import { Link as ReactLink, browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

export default class Link extends React.Component {

  static propTypes = {
    to: React.PropTypes.string.isRequired
  };

  render() {
    const { to, children, ...rest } = this.props;
    const toLocation = this.parseTo(to);
    const isInternal = this.isInternal(toLocation);

    if (isInternal) {
      return <ReactLink to={ toLocation.pathname } { ...rest }>{ children }</ReactLink>;
    } else {
      return <a href={ to } target="_blank" { ...rest }>{ children }</a>;
    }
  }

  parseTo(to) {
    let parser = document.createElement('a');
    parser.href = to;
    return parser;
  }

  isInternal(toLocation) {
    return window.location.host === toLocation.host;
  }
}

export const LinkButton = ({ to, label, children, ...rest }) => (
  <FlatButton onTouchTap={ () => browserHistory.push(to) } label={ label || children } { ...rest } />
);

LinkButton.propTypes = {
  to: React.PropTypes.string.isRequired,
  label: React.PropTypes.string
};
