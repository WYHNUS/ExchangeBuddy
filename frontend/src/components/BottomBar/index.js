import React, {Component, PropTypes} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

// import { Provider } from 'react-redux';
import * as IconsHelper from '../../util/icons';
import './Nav.css';

function urlToIdx(url) {
  let urlFmt = url.substring(1).toLowerCase();
  // /drops -> drops
  let urlArr = urlFmt.split('/');
  const firstLvl = urlArr[0];
  /*if(urlArr.length > 1 && firstLvl === "drops") {
    // drops/:id have second lvl
    return -1;
  }*/
  switch (firstLvl) {
    case 'home':
    return 0;
    case 'wiki':
    return 1;
    case 'journal':
    return 2;
    case 'stories':
    return 3;
    case 'profile':
    return 4;
    case '':
    return 0;
    default:
    return -1;
  }
}

class BottomBarComponent extends Component {

  goToURL(url) {
    return ()=>browserHistory.push(url);
  }

  /*BottomBar.contextTypes = {

  };*/

  render() {
    const tabIdx = urlToIdx(window.location.pathname);
    return (
      <div>
      {      
      <Paper zDepth={1} className="bottom-navigation">
      <BottomNavigation selectedIndex={tabIdx}>
      <BottomNavigationItem onTouchTap={this.goToURL('/group/home')} label="Home" icon={IconsHelper.materialIcon("home")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/group/wiki')} label="Wiki" icon={IconsHelper.materialIcon("info")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/group/journal')} className="Journal" icon={IconsHelper.materialIcon("info")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/group/stories')} label="Stories" icon={IconsHelper.materialIcon("info")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/group/profile')} label="Profile" icon={IconsHelper.materialIcon("info")} />
      </BottomNavigation>
      </Paper>
      }
      </div>
    )
  }
}

/*BottomBarComponent.propTypes = {
  pageVisibility: PropTypes.object.isRequired
};*/

export default BottomBarComponent;