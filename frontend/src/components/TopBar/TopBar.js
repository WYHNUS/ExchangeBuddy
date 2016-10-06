import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

//import '../styles/TopBar.css'
import * as IconsHelper from '../../util/icons';
import IconButton from 'material-ui/IconButton';

import {browserHistory} from 'react-router';
//import * as Icons from '../utils/Icons';
import classNames from 'classnames';

function handleTouchTap(state) {
	browserHistory.push('/');
}

class TopBar extends Component {

	navigateBack(){
		browserHistory.goBack();
	}

	render(){
    const appClass = classNames({
      'back-btn': this.props.pageVisibility.topBarBackButtonVisibility,
      'app-bar': true,
    });

		return(
			<AppBar
        className={appClass}
  			title={<span id="app-title">exchangebuddy</span>}
        style={{textAlign:"center"}}
  			onTitleTouchTap={handleTouchTap}
  			iconElementLeft={<IconButton
  				onClick={this.navigateBack}>
  				{IconsHelper.materialIcon("arrow_back")}
          </IconButton>}
        iconElementRight={<IconButton
          onClick={()=>this.props.toggleHomeSearchDrawerVisibility(true)}>
          {IconsHelper.materialIcon("filter_list")}
          </IconButton>}
  			showMenuIconButton={this.props.pageVisibility.topBarBackButtonVisibility}
			/>
			)
	}
}

TopBar.propTypes = {
  pageVisibility: PropTypes.object.isRequired
};

export default TopBar;
