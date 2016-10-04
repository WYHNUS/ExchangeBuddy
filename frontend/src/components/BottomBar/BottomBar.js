import React, {Component, PropTypes} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

import * as IconsHelper from '../../util/icons';
import '../../stylesheets/BottomBar.css';


function urlToIdx(url) {
  let urlFmt = url.substring(1).toLowerCase();
  // /drops -> drops
  let urlArr = urlFmt.split('/');
  const firstLvl = urlArr[0];
  /*if(urlArr.length > 1 && firstLvl === "drops") {
    // drops/:id have second lvl
    return -1;
  }*/
  console.log(firstLvl);  
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



class BottomBar extends Component {

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
      this.props.pageVisibility.bottomBarVisibility ?  
      <Paper zDepth={1} className="bottom-navigation">
      <BottomNavigation selectedIndex={tabIdx}>
      <BottomNavigationItem onTouchTap={this.goToURL('/home')} label="Home" icon={IconsHelper.materialIcon("home")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/wiki')} label="Wiki" icon={IconsHelper.materialIcon("info")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/journal')} className="Journal" icon={IconsHelper.materialIcon("create")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/stories')} label="Stories" icon={IconsHelper.materialIcon("library_books")} />
      <BottomNavigationItem onTouchTap={this.goToURL('/profile')} label="Profile" icon={IconsHelper.materialIcon("account_circle")} />
      </BottomNavigation>
      </Paper>
      :
      <div></div>
      }
      </div>
    )
  }
}

BottomBar.propTypes = {
  pageVisibility: PropTypes.object.isRequired
}

export default BottomBar;
