import React, {Component, PropTypes} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

import * as IconsHelper from '../../util/icons';


function urlToIdx(url) {
  let urlFmt = url.substring(1).toLowerCase();
  // /drops -> drops
  let urlArr = urlFmt.split('/');
  const firstLvl = urlArr[0];
  /*if(urlArr.length > 1 && firstLvl === "drops") {
    // drops/:id have second lvl
    return -1;
  }*/
  //console.log(firstLvl);  
  switch (firstLvl) {
    case 'home':
    return 0;
    // case 'wiki':
    // return 1;
    // case 'newstory':
    // return 1;
    case 'stories':
    return 1;
    case 'profile':
    return 2;
    case '':
    return 0;
    default:
    return -1;
  }
}



class BottomBar extends Component {

  goToURL(url) {
    if(url==='/home'){
      return ()=>{browserHistory.push(url);this.props.toggleHomeTab('friends');}
    }else{
      return ()=>browserHistory.push(url);
    }
  }

  componentDidUpdate(){
    /*const steps = 
    [
      {
        title: 'Home page',
        text: 'Check out your groups, chat, and organize events here!',
        selector: '.bottom-home',
        position: 'top',
        type: 'hover'
      },
      {
        title: 'Stories page',
        text: 'Read about the stories from seniors who have been there and done that',
        selector: '.bottom-stories',
        position: 'top',
        type: 'hover'
      },
      {
        title: 'Profile page',
        text: 'Check out your very own profile!',
        selector: '.bottom-profile',
        position: 'top',
        type: 'hover'
      }
    ]
    if(this.props.homeJoyride.start){
      setTimeout(() => {
            this.props.addSteps(steps);
        }, 300);
    }*/
  }

  render() {
    const tabIdx = urlToIdx(window.location.pathname);
    return (
      <div>
        {    
        this.props.pageVisibility.bottomBarVisibility ?  
        <Paper zDepth={1} className="bottom-navigation">
        <BottomNavigation selectedIndex={tabIdx}>
        <BottomNavigationItem onTouchTap={this.goToURL('/home')}
        className="bottom-home" 
        label="Home" icon={IconsHelper.materialIcon("home")} />
        {/*<BottomNavigationItem onTouchTap={this.goToURL('/wiki')} label="Wiki" icon={IconsHelper.materialIcon("info")} />*/}
        {/*<BottomNavigationItem onTouchTap={this.goToURL('/newstory')} label="NewStory" icon={IconsHelper.materialIcon("create")} />*/}
        <BottomNavigationItem onTouchTap={this.goToURL('/stories')} 
        className="bottom-stories"
        label="Stories" icon={IconsHelper.materialIcon("library_books")} />
        <BottomNavigationItem onTouchTap={this.goToURL('/profile/me')} 
        className="bottom-profile"
        label="Profile" icon={IconsHelper.materialIcon("account_circle")} />
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
  pageVisibility: PropTypes.object.isRequired,
  toggleHomeTab: PropTypes.func.isRequired,
  addSteps: PropTypes.func.isRequired,
  homeJoyride: PropTypes.object.isRequired
}

export default BottomBar;
