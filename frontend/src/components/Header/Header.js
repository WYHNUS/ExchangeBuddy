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


/*import * as Colors from 'material-ui/styles/colors';
import * as ImagesHelper from '../../util/images';
import * as UniversityHelper from '../../util/university';
import { pluralizer } from '../../util/helper';
*/
const gotourl = (groupId, tab) => () => {
  const queryParams = ['home', groupId];
  if (tab)
    queryParams.push(tab);

  browserHistory.push('/' + queryParams.join('/'));
};

const tabToIdx = tab => {
  //console.log(tab,'tab');
  switch(tab) {
    case 'events':
      return 0;
    case 'chat':
      return 1;
    case 'friends':
      return 2;
    default:
      return 0;
  }
}

const pathToIdx = () =>{
  
  var pathArray = window.location.pathname.split("/");
  console.log(pathArray);
  var path;
  if(pathArray.length>3){
    path = pathArray[3];
  }else{
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
    const { user, uni, group, actions, params, homeGroupDetails, homeTabValue } = this.props;
    //params=221241432;

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
        }}>

        <Grid>
          <Row id="header-row">

            <Col xs={6} md={2} id="logo-image">
              { /*ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 180, "exchangebuddy-logo")*/ }
            </Col>

            <Col xs={12} md={8} id="header-title">
              <h2 id="uni-name">{ homeGroupDetails.homeGroupDetails.name}</h2>
              <p id="uni-description">{ /*`${ group.term } ${ group.year } - ${ group.users.length } ${ pluralizer(group.users.length, 'Member', 'Members') }`*/ }</p>
            </Col>

            <Col xs={6} md={2}>
              {/*<HeaderProfile user={ user } uni={ uni } group={ group } actions={ actions } />*/}
            </Col>
          </Row>
        </Grid>
        <Grid>
          <div className="row center-xs center-md" >{/*id="header-tab-row"*/}
            <Col xs={12} md={8} id="header-tab-col">
            <Tabs inkBarStyle={{ backgroundColor: "#fff" }} value={homeTabValue} onChange={this.handleChange} >
              <Tab value='events' icon={IconsHelper.materialIcon("library_books")} label="EVENTS" className="header-tab" onActive={ gotourl(params.id, "events") } />
              <Tab value='chat' icon={IconsHelper.materialIcon("chat")} label="CHAT" className="header-tab" onActive={ gotourl(params.id, "chat") } />
              <Tab value='friends' icon={IconsHelper.materialIcon("people")} label="FRIENDS" className="header-tab" onActive={ gotourl(params.id, "friends") } />
            </Tabs>
            </Col>
          </div>
        </Grid>
      </div>
    );
  }
}

/*

value={this.props.value} onChange={this.handleChange}*/
//initialSelectedIndex={ pathToIdx() }