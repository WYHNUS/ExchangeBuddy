import React from 'react';
import MuiTheme from './mui-theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from "react-helmet";
import $ from "jquery";
import '../../public/application.css';

// import Header from './components/Header';
// import MessageSnackbar from '../components/MessageSnackbar/';

import { makeRouteSlug } from '../util/helper';
//import * as ImagesHelper from '../util/images';

// Component
class App extends React.Component {
  componentDidMount() {
    // Declare window resize handlers
    this.windowResizeHandlers = [
      (e) => {
        // this.props.actions.resizeBrowserWindow($(window).width());
      },
    ];

    this.windowResizeHandlers.forEach(handler => $(window).on('resize', handler).trigger('resize'));
  }

  componentWillUnmount() {
    this.windowResizeHandlers.forEach(handler => $(window).off('resize', handler));
  }

  render() {
    // const imageUrl = ImagesHelper.getUrlScale(Meteor.settings.public.logoImageId, 200, "exchangebuddy-logo");
    return (
      <MuiThemeProvider muiTheme={ MuiTheme }>
        <div id="root-container">
          {/*<title>ExchangeBuddy: Find your exchange buddies!</title>
           <meta name="description" content="A description for the application.">
           <meta name="viewport" content="initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1" />
           <link rel="shortcut icon" type="image/png" href="favicon.png?v1" sizes="16x16 32x32 64x64">
           <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-precomposed.png">*/}
          <Helmet
            defaultTitle="ExchangeBuddy - Find your exchange buddies!"
            meta={[
                {"name": "description", "content": "ExchangeBuddy - Find your exchange buddies!"},
                {"name": "viewport", "content": "initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1"},
                {"property": "og:type", "content": "exchangebuddy:exchange_group"},
                {"property": "og:url", "content": "http://app.exchangebuddy.com/"},
                {"property": "og:description", "content": "Find your exchange buddies!"},
                {"property": "og:title", "content": "ExchangeBuddy"}
            ]}
            link={[
                {"rel": "canonical", "href": "http://app.exchangebuddy.com"},
                {"rel": "shortcut icon", "href": "favicon.png?v1", "type": "image/png", "sizes": "16x16 32x32 64x64"},
                {"rel": "apple-touch-icon", "sizes": "120x120", "href": "apple-touch-icon-precomposed.png"}
            ]} />
          <div id="main" className={`page-${ makeRouteSlug(this.props.routes) }`}>
            { this.props.children }
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

// <MuiThemeProvider muiTheme={ MuiTheme }>
//         <div id="root-container">
//       {/*<title>ExchangeBuddy: Find your exchange buddies!</title>
//           <meta name="description" content="A description for the application.">
//           <meta name="viewport" content="initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1" />
//           <link rel="shortcut icon" type="image/png" href="favicon.png?v1" sizes="16x16 32x32 64x64">
//           <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-precomposed.png">*/}
//           <Helmet
//             defaultTitle="ExchangeBuddy - Find your exchange buddies!"
//             meta={[
//                 {"name": "description", "content": "ExchangeBuddy - Find your exchange buddies!"},
//                 {"name": "viewport", "content": "initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1"},
//                 {"property": "og:type", "content": "exchangebuddy:exchange_group"},
//                 {"property": "og:url", "content": "http://app.exchangebuddy.com/"},
//                 {"property": "og:description", "content": "Find your exchange buddies!"},
//                 {"property": "og:title", "content": "ExchangeBuddy"},
//                 {"property": "og:image", "content": imageUrl},
//                 {"property": "fb:app_id", "content": Meteor.settings.public.Facebook.appId }
//             ]}
//             link={[
//                 {"rel": "canonical", "href": "http://app.exchangebuddy.com"},
//                 {"rel": "shortcut icon", "href": "favicon.png?v1", "type": "image/png", "sizes": "16x16 32x32 64x64"},
//                 {"rel": "apple-touch-icon", "sizes": "120x120", "href": "apple-touch-icon-precomposed.png"}
//             ]} />
//           <div id="main" className={`page-${ makeRouteSlug(this.props.routes) }`}>
//             { this.props.children }
//           </div>

//           <MessageSnackbar />
//         </div>
//       </MuiThemeProvider>

// App.propTypes = {
//   children: React.PropTypes.element.isRequired,
// };

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resizeBrowserWindow } from '../actions/browser';

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ resizeBrowserWindow }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(App);