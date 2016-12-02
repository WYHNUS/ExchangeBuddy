import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';

//import '../styles/TopBar.css'
import * as IconsHelper from '../../util/icons';
import IconButton from 'material-ui/IconButton';

import {browserHistory} from 'react-router';
import classNames from 'classnames';

import FlatButton from 'material-ui/FlatButton';

const src = require('../../static/ExchangeBuddyMini.png');

class TopBar extends Component {
  render() {

    const appClass = classNames({
      'back-btn': this.props.pageVisibility.topBarSettingsButton,
      'app-bar': true,
    });

    const{topBarVisibility} = this.props.pageVisibility;

    return(
      <div>
      {topBarVisibility?
        (<AppBar
          className={appClass}
          title={<span id="app-title">{<img src={src}/>}</span>}
          style={{textAlign:'center'}}
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

  navigateBack() {
    browserHistory.goBack();
  }

  getIconElementLeft() {

    const{topBarSettingsButton, topBarBackButtonVisibility} = this.props.pageVisibility;

    if((topBarSettingsButton)&&(!topBarBackButtonVisibility)){
      return (
        <IconButton
        onClick={()=>browserHistory.push('/settings')}>
        {IconsHelper.materialIcon('settings')}
        </IconButton>
        )

    }else if ((!topBarSettingsButton)&&(topBarBackButtonVisibility)){
      return(
        <IconButton
        onClick={this.navigateBack}>
        {IconsHelper.materialIcon('chevron_left')}
        </IconButton>
        )

    }else{
      return (<div style={{ margin: 24 }}></div>)
    }
  }

  getIconElementRight() {
    const { homeSearchDrawerOpenButtonVisibility } = this.props.pageVisibility;

    if (homeSearchDrawerOpenButtonVisibility) {
      return (
        <FlatButton
        className="flat-button-top"
        label="Groups"
        onClick={ () => this.props.toggleHomeSearchDrawerVisibility(true) } />
      );
    } else {
      return <div style={{ marginLeft: 44, marginRight: 44, marginTop: 24,  marginBottom: 24 }}></div>;
    }
  }

}

TopBar.propTypes = {
  pageVisibility: PropTypes.object.isRequired
};

export default TopBar;
