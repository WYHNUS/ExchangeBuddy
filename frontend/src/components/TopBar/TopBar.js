import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

//import '../styles/TopBar.css'
import * as IconsHelper from '../../util/icons';
import IconButton from 'material-ui/IconButton';

import {browserHistory} from 'react-router';
//import * as Icons from '../utils/Icons';
import classNames from 'classnames';

const src = require('../../static/ExchangeBuddyMini.png');

function handleTouchTap(state) {
	browserHistory.push('/');
}

class TopBar extends Component {

	navigateBack(){
		browserHistory.goBack();
	}

  setElementClass(){
    if(this.props.pageVisibility.homeSearchDrawerOpenButtonVisibility){
      return "filter-list-visible";
    }else{
      return "filter-list-invisible";
    }
  }

  getIconElementLeft(){
    const{topBarSettingsButton, topBarBackButtonVisibility} = this.props.pageVisibility;
    if((topBarSettingsButton)&&(!topBarBackButtonVisibility)){
      return (
        <IconButton
        onClick={()=>browserHistory.push('/settings')}>
        {IconsHelper.materialIcon("settings")}
        </IconButton>
        )
    }else if ((!topBarSettingsButton)&&(topBarBackButtonVisibility)){
      return(
        <IconButton
        onClick={this.navigateBack}>
        {IconsHelper.materialIcon("chevron_left")}
        </IconButton>
        )
    }else{
      return (<div style={{margin:"24px"}}></div>)
    }
  }

  render(){
    const appClass = classNames({
      'back-btn': this.props.pageVisibility.topBarSettingsButton,
      'app-bar': true,
    });

    /*setElementClass(){
      if(this.props.)
      className={`page-${ makeRouteSlug(this.props.routes) }`}
  }*/

    /*getIconElementLeft(){
      return()
    }*/
    const{topBarVisibility} = this.props.pageVisibility;

    return(
      <div>
      {topBarVisibility?
        (<AppBar
          className={appClass}
          title={<span id="app-title">{<img src={src}/>}</span>}
          style={{textAlign:"center"}}
          onTitleTouchTap={handleTouchTap}
          iconElementLeft={ this.getIconElementLeft() }
          iconElementRight={<IconButton
            className={this.setElementClass()}
            onClick={()=>this.props.toggleHomeSearchDrawerVisibility(true)}>
          {/*IconsHelper.materialIcon("filter_list")*/}
          {IconsHelper.icon('menu')}
          </IconButton>}
          showMenuIconButton={true}
          />)
        :
        (<div></div>)
      }

      </div>
      )
  }
}

TopBar.propTypes = {
  pageVisibility: PropTypes.object.isRequired
};

export default TopBar;
