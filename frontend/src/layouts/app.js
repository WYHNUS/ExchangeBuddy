import React from 'react';
import {PropTypes} from 'react';
import MuiTheme from './mui-theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from "react-helmet";
import $ from "jquery";
import MessageSnackbar from '../components/MessageSnackbar';
import { makeRouteSlug } from '../util/helper';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import Drawer from 'material-ui/Drawer';
import Headroom from 'react-headroom';
import '../stylesheets/application.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resizeBrowserWindow } from '../actions/browser';
import {toggleHomeSearchDrawerVisibility} from '../actions/pageVisibility';

class App extends React.Component{

	render(){
		return(
			<MuiThemeProvider muiTheme={MuiTheme}>

			<div>

			<Headroom>
					<TopBar onTouchTap={()=>this.props.toggleHomeSearchDrawerVisibility(false)}/>
					</Headroom>

			<div id="root-container">

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

					<Drawer 
					width={200} 
					openSecondary={true} 
					open={this.props.homeSearchDrawerOpen}
					disableSwipeToOpen={false}
					docked={false} 
					onRequestChange={(open) => this.props.toggleHomeSearchDrawerVisibility(open)}>
					</Drawer>

					

					</div>

					<BottomBar/>

					</div>

					</MuiThemeProvider>
					);
	}
}

const mapStateToProps = (state)=>{
  return {
    homeSearchDrawerOpen: state.pageVisibility.homeSearchDrawerOpen
  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ resizeBrowserWindow }, dispatch),
		toggleHomeSearchDrawerVisibility: visibility=>dispatch(toggleHomeSearchDrawerVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);