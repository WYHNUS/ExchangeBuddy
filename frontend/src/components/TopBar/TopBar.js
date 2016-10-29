import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

//import '../styles/TopBar.css'
import * as IconsHelper from '../../util/icons';
import IconButton from 'material-ui/IconButton';

import {browserHistory} from 'react-router';
import classNames from 'classnames';

import FlatButton from 'material-ui/FlatButton';

const src = require('../../static/ExchangeBuddyMini.png');

function handleTouchTap(state) {
	browserHistory.push('/');
}

class TopBar extends Component {

	navigateBack(){
		browserHistory.goBack();
	}

  /*setElementClass(){
    if(this.props.pageVisibility.homeSearchDrawerOpenButtonVisibility){
      return "filter-list-visible";
    }else{
      return "filter-list-invisible";
    }
  }*/

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

  getIconElementRight(){
    const{homeSearchDrawerOpenButtonVisibility} = this.props.pageVisibility
    if(homeSearchDrawerOpenButtonVisibility){
      return(
        <FlatButton 
        label="Groups"
        onClick={()=>this.props.toggleHomeSearchDrawerVisibility(true)}
        />
        /*{<IconButton
                onClick={()=>this.props.toggleHomeSearchDrawerVisibility(true)}>
                {IconsHelper.icon('menu')}
                </IconButton>}*/
        )
    }else{
      return (<div style={{marginLeft:"44px",marginRight:"44px",marginTop:"24px", marginBottom:"24px"}}></div>)
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
          iconElementRight={ this.getIconElementRight()}
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
