import React from 'react';
import { browserHistory } from 'react-router';
// import LoginButton from '../components/LoginButton';
import RaisedButton from 'material-ui/RaisedButton';
// import * as ImagesHelper from '../util/images';
import * as IconsHelper from '../util/icons';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';
// Needed for onTouchTap
//import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationBar from '../components/NavigationBar/NavigationBar';

const landingContainerStyle = {
  backgroundColor: "darkslategray",
}

//injectTapEventPlugin();

// const landingImg = {
//   background: `linear-gradient(to top, rgba(25, 25, 25, 0.21) 0%,rgb(0, 0, 0) 215%),
//     url(${ImagesHelper.getUrlScale(Meteor.settings.public.landingImageId, 900)}) no-repeat center center `,
// }

const Home = () => (
  <div id="landing-container" style={landingContainerStyle}>
    <div id="welcome-header" >

      <NavigationBar />

      <div id="welcome-main-container">
        <div id="welcome-header-title">
          <h2 id="app-title">Find out who else is on an adventure</h2>
          <p className="app-subtitle">Find your travel buddies from over 900 universities on ExchangeBuddy!</p>
          <p className="app-subtitle">Share tips for the trip, by students, for students.</p>
          <p className="app-subtitle">Forget the messy Facebook groups and Google forms, all you need is right here.</p>
        </div>

          <RaisedButton
            primary={true}
            label="Go to your group"
            onTouchTap={ () => browserHistory.push('/group') }
            style={{ maxWidth: 250, margin: '0 auto', height: 50 }}
            labelStyle={{ fontSize: "16px", padding: '0 20px' }} />

        <div id="feature-list">
          <Grid>
            <div className="row center-xs center-md feature-row">
              <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("info")}<p>Information Wiki</p></Col>
              <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("group")}<p>Group Chat</p></Col>
              <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("event")}<p>Event Listing</p></Col>
            </div>
          </Grid>
        </div>
      </div>
    </div>
  </div>
);

// <div id="landing-container" style={landingContainerStyle}>
//     <div id="welcome-header" style={landingImg}>

//       <NavigationBar />

//       <div id="welcome-main-container">
//         <div id="welcome-header-title">
//           <h2 id="app-title">Find out who else is on an adventure</h2>
//           <p className="app-subtitle">Find your travel buddies from over 900 universities on ExchangeBuddy!</p>
//           <p className="app-subtitle">Share tips for the trip, by students, for students.</p>
//           <p className="app-subtitle">Forget the messy Facebook groups and Google forms, all you need is right here.</p>
//         </div>

//         { !Meteor.user() ?
//           <div id="login-button">
//             <LoginButton />
//           </div>
//         : <RaisedButton
//             primary={true}
//             label="Go to your group"
//             onTouchTap={ () => browserHistory.push('/group') }
//             style={{ maxWidth: 250, margin: '0 auto', height: 50 }}
//             labelStyle={{ fontSize: "16px", padding: '0 20px' }} />
//         }

//         <div id="feature-list">
//           <Grid>
//             <div className="row center-xs center-md feature-row">
//               <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("info")}<p>Information Wiki</p></Col>
//               <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("group")}<p>Group Chat</p></Col>
//               <Col xs={4} sm={3} md={2}>{IconsHelper.materialIcon("event")}<p>Event Listing</p></Col>
//             </div>
//           </Grid>
//         </div>
//       </div>
//     </div>
//   </div>

export default Home;
