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

	render(){
    const appClass = classNames({
      'back-btn': this.props.pageVisibility.topBarBackButtonVisibility,
      'app-bar': true,
    });

    /*setElementClass(){
      if(this.props.)
      className={`page-${ makeRouteSlug(this.props.routes) }`}
    }*/
    

		return(
      <div>
      
			<AppBar
        className={appClass}
  			title={<span id="app-title">{<img src={src}/>}</span>}
        style={{textAlign:"center"}}
  			onTitleTouchTap={handleTouchTap}
  			iconElementLeft={<IconButton
  				onClick={/*this.navigateBack*/()=>browserHistory.push('/settings')}>
  				{IconsHelper.materialIcon("settings")}
          </IconButton>}
        iconElementRight={<IconButton
          className={this.setElementClass()}
          onClick={()=>this.props.toggleHomeSearchDrawerVisibility(true)}>
          {IconsHelper.materialIcon("filter_list")}
          </IconButton>}
  			showMenuIconButton={this.props.pageVisibility.topBarBackButtonVisibility}
			/>
      </div>
			)
	}
}

TopBar.propTypes = {
  pageVisibility: PropTypes.object.isRequired
};

export default TopBar;
