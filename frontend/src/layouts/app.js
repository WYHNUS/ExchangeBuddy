import React from 'react';
import {PropTypes} from 'react';
import MuiTheme from './mui-theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import { makeRouteSlug } from '../util/helper';
import BottomBar from '../components/BottomBar';
import TopBar from '../components/TopBar';
import '../stylesheets/application.scss';
import MessageSnackbar from '../components/MessageSnackbar'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { resizeBrowserWindow } from '../actions/browser';

import Search from '../pages/home/search';
import {addJoyride} from '../actions/home';
import Joyride from 'react-joyride';

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      ready: false,
      steps: []
    };
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.props.homeJoyride.start){
      setTimeout(() => {
            this.setState({
              ready: true
            });
        }, 1000);
        if (!prevState.ready && this.state.ready) {
          console.log('here joy ride starts');
        this.joyride.start(true);
      }
    }
  }

  render(){

    const{homeJoyride} = this.props;

    return(

      <MuiThemeProvider muiTheme={MuiTheme}>

      <div>

      <Joyride 
        ref={c => (this.joyride = c)} 
        steps={this.state.steps} 
        debug={false}
        type="continuous"
        showSkipButton={true}
        showStepsProgress={true}
        showOverlay={true} />

      <TopBar 
        onTouchTap={()=>this.props.toggleHomeSearchDrawerVisibility(false)}
        addSteps={this.addSteps} />

      <div id="root-container">

      <Helmet
        defaultTitle="ExchangeBuddy - Find your exchange buddies!"
        meta={
          [
            {'name': 'description', 'content': 'ExchangeBuddy - Find your exchange buddies!'},
            {'name': 'viewport', 'content': 'initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1'},
            {'property': 'og:type', 'content': 'exchangebuddy:exchange_group'},
            {'property': 'og:url', 'content': 'http://app.exchangebuddy.com/'},
            {'property': 'og:description', 'content': 'Find your exchange buddies!'},
            {'property': 'og:title', 'content': 'ExchangeBuddy'}
          ]
        }
        link={
          [
            {'rel': 'canonical', 'href': 'http://app.exchangebuddy.com'},
            {'rel': 'shortcut icon', 'href': 'favicon.png?v1', 'type': 'image/png', 'sizes': '16x16 32x32 64x64'},
            {'rel': 'apple-touch-icon', 'sizes': '120x120', 'href': 'apple-touch-icon-precomposed.png'}
          ]
        } />


      <div id="main" className={`page-${ makeRouteSlug(this.props.routes) }`}>
      { this.props.children }
      </div>

      <Search addSteps={this.addSteps}/>


      </div>

      <MessageSnackbar/>

      <BottomBar addSteps={this.addSteps}/>

      </div>

      </MuiThemeProvider>
      );
  }

  addSteps=(steps)=>{
    const joyride = this.joyride;
    let newSteps = steps;

    if (!Array.isArray(newSteps)) {
      newSteps = [newSteps];
    }

    if (!newSteps.length) {
      return;
    }

    this.setState(currentState => {
      currentState.steps = currentState.steps.concat(joyride.parseSteps(newSteps));
      return currentState;
    });
  }
}

const mapStateToProps = (state)=>{
  return {
    homeJoyride: state.home.homeJoyride
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ resizeBrowserWindow }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);