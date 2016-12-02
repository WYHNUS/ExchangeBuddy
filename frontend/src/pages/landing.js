import React from 'react';
import { browserHistory } from 'react-router';
import * as IconsHelper from '../util/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import landing from '../res/ExchangeBuddySpread.jpg';
import ExchangeBuddySpreadIcon from '../res/ExchangeBuddySpreadIcon.png';
//import LoginButton from '../components/LoginButton';
import FlatButton from 'material-ui/FlatButton';
import ReactPaginate from 'react-paginate';

import { connect } from 'react-redux';
import { toggleTopBarVisibility, toggleBottomBarVisibility } from '../actions/pageVisibility';
var request = require('superagent');


const landingContainerStyle = {
  // backgroundColor: "darkslategray",
}

/*const landingImg = {
  background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
    url(${ImagesHelper.getUrlScale(Meteor.settings.public.landingImageId, 900)}) no-repeat center center `,
}*/
const landingImg= {
  background: `url(${landing}) no-repeat`,
  backgroundPosition: 'top center',
  backgroundSize: 'cover',
}

//TODO check login logic before deciding which button to serve to users

class Landing extends React.Component {
  state = {
    pageNum: 0
  };

  componentDidMount() {
    this.props.toggleBottomBarVisibility(false);
    this.props.toggleTopBarVisibility(false);
    // console.log("enter landing page!");
  }

  render(){

    const{user}=this.props;
    return(
      <div id="landing-container" style={landingContainerStyle}>
      
      <div id="welcome-header-container">
      <div id="welcome-header" style={landingImg}>

      <div className="row start-xs">
      <div className="col-xs welcome-icon-container">
      <img id="welcome-icon" src={ExchangeBuddySpreadIcon} alt="Icons"/>
      </div>
      <div>
      <FlatButton
        onClick={()=>browserHistory.push('/settings')}
        icon={IconsHelper.materialIcon('menu')}>
      </FlatButton>
      </div>
      </div>


      <div id="welcome-main-container">
        <div id="welcome-header-title">
        
        {/*<h1>Find out who else is on an adventure</h1>*/}
          {<h2 id="app-title">Going for Student Exchange?</h2>}
          <div id="app-subtitle-container">
          <p className="app-subtitle">Connect to our network of over 900 universities!</p>
          {/*Find your travel buddies from over 900 universities on ExchangeBuddy!*/}
          {/*<p className="app-subtitle">Share tips for the trip, by students, for students.</p>
          <p className="app-subtitle">Forget the messy Facebook groups and Google forms, all you need is right here.</p>*/}
          </div>
        </div>
        <RaisedButton
          primary={true}
          label="Connect"
          onTouchTap={ () => browserHistory.push('/signup')}
          style={{ maxWidth: 250, margin: '0 auto', height: 50 }}
          labelStyle={{ fontSize: '16px', padding: '0 20px' }} />
      </div>
    </div>
    </div>
    <div id="cover-lists">
    <div id="feature-list">
      <div className="row center-xs">
      <h2>Maximize your exchange experience!</h2>
      </div>
      <div className="row feature-row center-xs">
          
          <div className="icon-container col-xs-12 col-md-4 col-lg-4">{IconsHelper.materialIcon('group')}
          <p id="icon-title">Know your group</p>
          <p>Find travel buddies within your different groups</p>
          </div>

          <div className="icon-container col-xs-12 col-md-4 col-lg-4">{IconsHelper.materialIcon('library_books')}
          <p id="icon-title">Read senior's stories</p>
          <p>Learn tips and tricks from stories shared by other exchangers</p>
          </div>

          <div className="icon-container col-xs-12 col-md-4 col-lg-4">{IconsHelper.materialIcon('event')}
          <p id="icon-title">Attend and organise events</p>
          <p>Know people within your group by participating in new events</p>
          </div>

      </div>
    </div>
    {/*<div id="people-quote-list">
      <div className="row center-xs">
      <h2 id="quote-title">What other exchangers say...</h2>
      </div>
      <div className="row center-xs">
      </div>
      <h2 id="quote-title">Find more here...</h2>
      <div>
      </div>
    </div>*/}
    <div id="terms-and-services">
      2016 &copy; ExchangeBuddy.com. All Rights Reserved.
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