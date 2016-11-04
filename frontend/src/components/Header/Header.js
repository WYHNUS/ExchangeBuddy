import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router';
/*import { handleLogout } from '../../util/session';*/
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import Helmet from "react-helmet";
import Spinner from 'react-spinkit';

//import HeaderProfile from './HeaderProfile';
import * as IconsHelper from '../../util/icons';
import group0Uni from '../../res/group0_uni.jpg';
import group1Uni from '../../res/group1_uni.jpg';
import group2Uni from '../../res/group2_uni.jpg';
import group3Uni from '../../res/group3_uni.jpg';
import group4Uni from '../../res/group4_uni.jpg';

const imgArray=[group0Uni,group1Uni, group2Uni, group3Uni, group4Uni];

const gotourl = (groupId, tab) => () => {
  const queryParams = ['home', groupId];
  if (tab)
    queryParams.push(tab);

  browserHistory.push('/' + queryParams.join('/'));
};

const tabToIdx = tab => {
  //console.log(tab,'tab');
  switch(tab) {
    case 'friends':
      return 0;
    case 'chat':
      return 1;
    case 'events':
      return 2;
    default:
      return 0;
  }
}

const pathToIdx = () =>{
  
  var pathArray = window.location.pathname.split("/");
  console.log(pathArray);
  var path;
  if (pathArray.length > 3) {
    path = pathArray[3];
  } else {
    path='events';
  }
  //console.log(path);
  return tabToIdx(path);
}

/*const eventHandleScroll = (event) => {
  if ($(window).width() < 768)
    return;

  // Disable sticky header
  return;

  // This JavaScript to make the header collapse into small sticky header when scroll
  if ($(this).scrollTop() > 100) {
    $('#header').addClass("sticky");
    $('#header-title').addClass("sticky");
    $('#header-profile').addClass("sticky");
    $('#header-uni-logo').addClass("sticky");
  } else {
    $('#header').removeClass("sticky");
    $('#header-title').removeClass("sticky");
    $('#header-profile').removeClass("sticky");
    $('#header-uni-logo').removeClass("sticky");
  }
};*/

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingFile: false,
      bgImageId: null
    };
  }

  componentWillMount() {

    //console.log(window.location.pathname);
    //console.log(this.props.params);
    //console.log(this.props.tab);
  }

  handleChange = (value) => {
    this.props.toggleHomeTab(value);
  };

  /*addJoyrideSteps(steps) {

    const{isFirstTime, joyride} = this.props.homeJoyride;
    const{addOnboardStep} = this.props;
    
    if((isFirstTime)||(joyride==null)){
      return;
    }
    
    console.log('try adding to joyride')
    //const joyride = this.props.joyride;

    let newSteps = steps;

    if (!Array.isArray(newSteps)) {
      newSteps = [newSteps];
    }

    if (!newSteps.length) {
      return;
    }

    console.log('trying to add', joyride.parseSteps(newSteps));
    addOnboardStep(joyride.parseSteps(newSteps));
  }*/

  componentDidMount(){

    //console.log('header did mount');
    
    const steps = 
    [
      {
        title: 'Friends',
        text: 'Find friends in this group here!',
        selector: '.header-friends',
        position: 'top',
        type: 'hover'
      },
      {
        title: 'Chat',
        text: 'Talk to people exclusively in this group here!',
        selector: '.header-chat',
        position: 'top',
        type: 'hover'
      },
      {
        title: 'Events',
        text: 'Arrange events and meet up with friends in this group!',
        selector: '.header-events',
        position: 'top',
        type: 'hover'
      }
    ]

    //this.addJoyrideSteps(steps);
    //this.props.addSteps(steps);

  }

  

  render() {
    const { user, uni, group, actions, params, homeTabValue, 
      addOnboardStep, homeJoyride } = this.props;
    const { homeGroupDetails, loading, error } = this.props.homeGroupDetails;
    

    if(loading) {
      return <Spinner spinnerName="circle" />  
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    const getBackgroundImg=()=>{
      //console.log(homeGroupDetails.groupType);
      if(homeGroupDetails.groupType<5){
        return imgArray[homeGroupDetails.groupType];
      }
      return imgArray[1];
    }

    return (
      <div
        id="header"
        style={{
          /*backgroundImage: `linear-gradient(to bottom, rgba(25,25,25,0.5) 0%,rgba(0,0,0,0.9) 100%),
            url('${ImagesHelper.getUrlScale(this.state.bgImageId, 1000)}')`,
          backgroundColor: "#000000",
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',*/
          backgroundImage: `linear-gradient(to bottom, rgba(25,25,25,0.5) 0%,rgba(0,0,0,0.9) 100%),
            url('${getBackgroundImg()}')`,
          backgroundColor: "#000000",
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>

          <div className="row center-xs">

            {
              !!homeGroupDetails.name ? 
                (parseInt(homeGroupDetails.groupType) == 2 || parseInt(homeGroupDetails.groupType) == 4) ?
                  (
                    <div className='col-xs-12 col-md-8 col-lg-8' id="header-title">
                      <h2 id="uni-name">{ homeGroupDetails.name }</h2>
                    </div>
                  )
                : 
                  (parseInt(homeGroupDetails.groupType) == 1) ?
                    (
                      <div className='col-xs-12 col-md-8 col-lg-8' id="header-title">
                        <h2 id="uni-name">{ getName(homeGroupDetails.name) }</h2>
                        <p id="uni-description">{ `${getYear(homeGroupDetails.name)}` }</p>
                      </div>
                    )
                  : 
                    (
                      <div className='col-xs-12 col-md-8 col-lg-8' id="header-title">
                        <h2 id="uni-name">{ getName(homeGroupDetails.name) }</h2>
                        <p id="uni-description">{ `${getTerm(homeGroupDetails.name)} ${getYear(homeGroupDetails.name)}` }</p>
                      </div>
                    )
              : null
            }
            
          </div>
          <div className="row bottom-xs bottom-md center-xs" >
            <div className='col-xs-12 col-md-8' id="header-tab-col">
            <Tabs inkBarStyle={{ backgroundColor: "#fff" }} className="header-tab-parent" value={homeTabValue} onChange={this.handleChange} >
              <Tab className='header-friends' value='friends' icon={IconsHelper.materialIcon("people")} label="FRIENDS" className="header-tab" onActive={ gotourl(params.id, "friends") } />
              <Tab className='header-chat' value='chat' icon={IconsHelper.materialIcon("chat")} label="CHAT" className="header-tab" onActive={ gotourl(params.id, "chat") } />
              <Tab className='header-events' value='events' icon={IconsHelper.materialIcon("library_books")} label="EVENTS" className="header-tab" onActive={ gotourl(params.id, "events")}/>
            </Tabs>
            </div>
          </div>
      </div>
    );
  }
}

Header.propTypes = {
  toggleHomeTab: PropTypes.func.isRequired,
  addOnboardStep: PropTypes.func.isRequired,
  homeJoyride: PropTypes.object.isRequired,
  //addSteps: PropTypes.func.isRequired
}

function getName(homeGroupDetailsName){
  return homeGroupDetailsName.trim().split("--")[0].trim();
}

function getTerm(homeGroupDetailsName){
  return homeGroupDetailsName.trim().split("--")[1].trim().split(" ")[2];
}

function getYear(homeGroupDetailsName){
  return homeGroupDetailsName.trim().split("--")[1].trim().split(" ")[1];
}