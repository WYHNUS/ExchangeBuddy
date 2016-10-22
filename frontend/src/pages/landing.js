import React from 'react';
import { browserHistory } from 'react-router';
import * as IconsHelper from '../util/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import landing from '../res/landing.jpg';
import LoginButton from '../components/LoginButton';

import { connect } from 'react-redux';
import { toggleTopBarVisibility, toggleBottomBarVisibility } from '../actions/pageVisibility';
var request = require('superagent');


const landingContainerStyle = {
  backgroundColor: "darkslategray",
}

/*const landingImg = {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
    url(${ImagesHelper.getUrlScale(Meteor.settings.public.landingImageId, 900)}) no-repeat center center `,
}*/
const landingImg= {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
  url(${landing}) no-repeat center center`,
}

//TODO check login logic before deciding which button to serve to users

class Landing extends React.Component{
  componentDidMount() {
    this.props.toggleBottomBarVisibility(false);
    this.props.toggleTopBarVisibility(false);
  }

  render(){

    const{user}=this.props;
    return(
      <div id="landing-container" style={landingContainerStyle}>
      <div id="welcome-header" style={landingImg}>

      <div id="welcome-main-container">
        <div id="welcome-header-title">
          <h2 id="app-title">Find out who else is on an adventure</h2>
          <div id='app-subtitle-container'>
          <p className="app-subtitle">Find your travel buddies from over 900 universities on ExchangeBuddy!</p>
          <p className="app-subtitle">Share tips for the trip, by students, for students.</p>
          <p className="app-subtitle">Forget the messy Facebook groups and Google forms, all you need is right here.</p>
          </div>
        </div>

        {!user.isAuthenticated ?
          <div id="login-button">
            <LoginButton />
          </div>
        : <RaisedButton
            primary={true}
            label="Go to your group"
            onTouchTap={ () => /*request('/user/1')*/browserHistory.push('/home')}
            style={{ maxWidth: 250, margin: '0 auto', height: 50 }}
            labelStyle={{ fontSize: "16px", padding: '0 20px' }} />
        }
        {/*<div id="login-button">
          <LoginButton />
        </div>*/}

        <div id="feature-list">
          <div className="row feature-row center-xs">
              <div className="col-xs">{IconsHelper.materialIcon("info")}<p>Information Wiki</p></div>
              <div className="col-xs">{IconsHelper.materialIcon("group")}<p>Group Chat</p></div>
              <div className="col-xs">{IconsHelper.materialIcon("event")}<p>Event Listing</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility))
  };
};

const mapStateToProps = (state )=>{
  return{
    user: state.user.userObject
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);