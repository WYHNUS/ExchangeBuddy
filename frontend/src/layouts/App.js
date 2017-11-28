import React from 'react';
import MuiTheme from './MuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';

import MessageSnackbar from 'components/MessageSnackbar'

import { makeRouteSlug } from 'util/helper';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    routes: React.PropTypes.array.isRequired,
    location: React.PropTypes.object,
    actions: React.PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { actions: { resizeBrowserWindow } } = this.props;

    // Declare window resize handlers
    let timer;
    this.windowResizeHandlers = [
      () => {
        const handler = () => resizeBrowserWindow(window.innerWidth);

        if (!timer)
          handler();
        else
          clearTimeout(timer);

        timer = setTimeout(handler, 100);
      },
    ];

    this.windowResizeHandlers.forEach(handler => {
      window.addEventListener('resize', handler);
      window.dispatchEvent(new Event('resize'));
    });
  }

  componentWillUnmount() {
    this.windowResizeHandlers.forEach(handler => window.removeEventListener('resize', handler));
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ MuiTheme }>
        <div>

          <div id="root-container">
            <Helmet
              defaultTitle="ExchangeBuddy - Find your exchange buddies!"
              meta={
                [
                  {'name': 'description', 'content': 'ExchangeBuddy - Find your exchange buddies!'},
                  {'name': 'viewport', 'content': 'initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1'},
                  {'property': 'og:type', 'content': 'exchangebuddy:exchange_group'},
                  {'property': 'og:url', 'content': 'https://app.exchangebuddy.com/'},
                  {'property': 'og:description', 'content': 'Find your exchange buddies!'},
                  {'property': 'og:title', 'content': 'ExchangeBuddy'}
                ]
              }
              link={
                [
                  {'rel': 'canonical', 'href': 'https://app.exchangebuddy.com'},
                  {'rel': 'shortcut icon', 'href': 'favicon.png?v1', 'type': 'image/png', 'sizes': '16x16 32x32 64x64'},
                  {'rel': 'apple-touch-icon', 'sizes': '120x120', 'href': 'apple-touch-icon-precomposed.png'}
                ]
              } />
            <div id="main" className={`page-${ makeRouteSlug(this.props.routes) }`}>
              { this.props.children }
            </div>
          </div>

          <MessageSnackbar/>
        </div>
      </MuiThemeProvider>
      );
  }
}

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resizeBrowserWindow } from 'actions/Browser';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ resizeBrowserWindow }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(App);
