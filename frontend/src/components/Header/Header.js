import React from 'react';
import { browserHistory } from 'react-router';
/*import { handleLogout } from '../../util/session';*/
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import LinearProgress from 'material-ui/LinearProgress';
import Helmet from "react-helmet";

import HeaderProfile from './HeaderProfile';

/*import * as Colors from 'material-ui/styles/colors';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import * as UniversityHelper from '../../util/university';
import { pluralizer } from '../../util/helper';
*/
const gotourl = (groupId, tab) => () => {
  const queryParams = ['group', groupId];

  if (tab)
    queryParams.push(tab);

  browserHistory.push('/' + queryParams.join('/'));
};

const tabToIdx = tab => {
  switch(tab) {
    case 'home':
      return 0;
    case 'info':
      return 1;
    case 'chat':
      return 2;
    case 'events':
      return 3;
    default:
      return 0;
  }
}

const getTitle = tab => {
  if(tab)
    return tab.charAt(0).toUpperCase() + tab.slice(1);
  else
    return 'Home';
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
      bgImageId: null,
    };
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

  componentWillMount(nextProps) {
    this.setState({
      bgImageId: this.props.uni.bgImageId || 'exchangebuddy/section-images/About'
    });
  }

  /*componentDidMount() {
    $(window).on('scroll', eventHandleScroll);
  }

  componentWillUnmount() {
    $(window).off('scroll', eventHandleScroll);
  }*/

  render() {
    const { user, uni, group, actions, params, tab } = this.props;

    return (
      <div
        id="header"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(25,25,25,0.5) 0%,rgba(0,0,0,0.9) 100%),
            url('${ImagesHelper.getUrlScale(this.state.bgImageId, 1000)}')`,
          backgroundColor: "#000000",
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>

        <Helmet title={ getTitle(tab) } titleTemplate ={"%s - "+ uni.name} meta={[{"property": "og:image", "content": UniversityHelper.getImageUrl(uni,200) }]}/>

        <Grid>
          <Row id="header-row">

            <Col xs={6} md={2} id="logo-image">
              { /*ImagesHelper.makeScale(Meteor.settings.public.logoImageId, 180, "exchangebuddy-logo")*/ }
            </Col>

            <Col xs={12} md={8} id="header-title">
              <h2 id="uni-name">{ uni.name }</h2>
              <p id="uni-description">{ `${ group.term } ${ group.year } - ${ group.users.length } ${ pluralizer(group.users.length, 'Member', 'Members') }` }</p>
            </Col>

            <Col xs={6} md={2}>
              <HeaderProfile user={ user } uni={ uni } group={ group } actions={ actions } />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <div className="row center-xs center-md" id="header-tab-row">
            <Col xs={12} md={8} id="header-tab-col">
            <Tabs inkBarStyle={{ backgroundColor: "#fff" }} initialSelectedIndex={ tabToIdx(tab) } >
              <Tab icon={IconsHelper.materialIcon("home")} label="HOME" className="header-tab" onActive={ gotourl(params.id) } />
              <Tab icon={IconsHelper.materialIcon("info")} label="INFO" className="header-tab" onActive={ gotourl(params.id, "info") } />
              { /*Meteor.user() && <Tab icon={IconsHelper.materialIcon("chat")*/} label="CHAT" className="header-tab" onActive={ gotourl(params.id, "chat") } /> }
              <Tab icon={IconsHelper.materialIcon("event")} label="EVENTS" className="header-tab" onActive={ gotourl(params.id, "events") } />
            </Tabs>
            </Col>
          </div>
        </Grid>

        <input id="file-upload" type="file" accept="image/*"onChange={ this.handleUpload.bind(this) } />
        <IconButton className="upload_cover_photo" onTouchTap={ () => $("#file-upload").trigger('click') } tooltip="Upload a new university cover photo" tooltipPosition="top-left">
          { IconsHelper.icon('add_a_photo', { color: Colors.grey100 }) }
        </IconButton>

        { this.state.loadingFile && <LinearProgress style={{ position: 'absolute', bottom: 0 }} mode="indeterminate" /> }
      </div>
    );
  }
}
