import React from 'react';
import { browserHistory } from 'react-router';
/*import { handleLogout } from '../../util/session';*/
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import Helmet from "react-helmet";

//import HeaderProfile from './HeaderProfile';
import * as IconsHelper from '../../util/icons';
import group0Uni from '../../res/group0_uni.jpg';
import group1Uni from '../../res/group1_uni.jpg';
import group2Uni from '../../res/group2_uni.jpg';
import group3Uni from '../../res/group3_uni.jpg';



/*import * as Colors from 'material-ui/styles/colors';
import * as ImagesHelper from '../../util/images';
import * as UniversityHelper from '../../util/university';
import { pluralizer } from '../../util/helper';
*/

const imgArray=[group0Uni,group1Uni, group2Uni, group3Uni];

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

  /*handleUpload(event) {
    const self = this;
    const files = event.currentTarget.files;
    this.setState({ loadingFile: true });

    Cloudinary.upload(files, {}, function(err, cloudinaryRes) {
      Meteor.call('University.setBgImage', Meteor.userToken(), self.props.uni.id, cloudinaryRes.public_id, function(err, res) {
        if (err)
          return;

        self.props.actions.showSnackbar("Updated university cover photo.");
        self.setState({
          loadingFile: false,
          bgImageId: cloudinaryRes.secure_url,
        });
      });
    });
  }*/

  /*componentWillMount(nextProps) {
    this.setState({
      bgImageId: this.props.uni.bgImageId || 'exchangebuddy/section-images/About'
    });
  }*/

  /*componentDidMount() {
    $(window).on('scroll', eventHandleScroll);
  }

  componentWillUnmount() {
    $(window).off('scroll', eventHandleScroll);
  }*/

  handleChange = (value) => {
    this.props.toggleHomeTab(value);
  };

  

  render() {
    const { user, uni, group, actions, params, homeTabValue } = this.props;
    const { homeGroupDetails, loading, error } = this.props.homeGroupDetails;
    

    if(loading) {
      return <div className="container"><h1>Group</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    console.log(homeGroupDetails);
    const getBackgroundImg=()=>{
      //console.log(homeGroupDetails.groupType);
      if(homeGroupDetails.groupType<4){
        return imgArray[homeGroupDetails.groupType];
      }
      // randomly choose one -> need to fix later
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

            {/*<div className="col-xs-6 col-md-2" id="logo-image">
              { ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 180, "exchangebuddy-logo") }
            </div>*/}

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

            {/*<div className="col-xs-6 col-md-2">
              {<HeaderProfile user={ user } uni={ uni } group={ group } actions={ actions } />}
            </div>*/}
          </div>
          <div className="row bottom-xs bottom-md center-xs" >{/*id="header-tab-row"*/}
            <div className='col-xs-12 col-md-8' id="header-tab-col">
            <Tabs inkBarStyle={{ backgroundColor: "#fff" }} className="header-tab-parent" value={homeTabValue} onChange={this.handleChange} >
              <Tab value='friends' icon={IconsHelper.materialIcon("people")} label="FRIENDS" className="header-tab" onActive={ gotourl(params.id, "friends") } />
              <Tab value='chat' icon={IconsHelper.materialIcon("chat")} label="CHAT" className="header-tab" onActive={ gotourl(params.id, "chat") } />
              <Tab value='events' icon={IconsHelper.materialIcon("library_books")} label="EVENTS" className="header-tab" onActive={ gotourl(params.id, "events")}/>
            </Tabs>
            </div>
          </div>
      </div>
    );
  }
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

/*

value={this.props.value} onChange={this.handleChange}*/
//initialSelectedIndex={ pathToIdx() }