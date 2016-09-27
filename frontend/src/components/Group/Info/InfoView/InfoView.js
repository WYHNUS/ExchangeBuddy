import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Markdown from 'react-markdown';
import FacebookProvider, { Like } from 'react-facebook';
import { browserHistory } from 'react-router';
import Helmet from "react-helmet";

import * as IconsHelper from '../../../../../util/icons';
import * as InfoHelper from '../../../../../util/info';
import * as ImagesHelper from '../../../../../util/images';
import * as Colors from 'material-ui/styles/colors';

const querystring = require('querystring');

export default class InfoView extends Component {

  makeOpenShareDialog(item, subtitle) {
    return event => {
      const appId = Meteor.settings.public.Facebook.appId;
      const description = `Check out some tips about ${item.section.label}, ${subtitle}`;
      const title = "ExchangeBuddy Tips";
      const link = window.location.href;

      const qs = querystring.stringify({
        app_id: appId,
        link,
        description,
        title,
      });

      const href = `https://www.facebook.com/dialog/feed?${qs}`;
      window.open(href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=320')
    };
  }

  render() {
    const { about, aboutId, sectionId, groupId, group, item } = this.props;
    const imageUrl = InfoHelper.getImageUrl(item, 500),
          absoluteUrl = Meteor.absoluteUrl(`likes/info/${about}/${aboutId}/${sectionId}`),
          sectionSubtitle = InfoHelper.getSectionSubtitle(item, group);

    const Overlay = () => (
      <CardTitle
        className="info-title"
        title={ item.section.label }
        subtitle={ sectionSubtitle }
        style={{ zIndex: 10 }}
        titleStyle={{ lineHeight: "3rem", fontWeight: 400, fontSize:"250%", color: Colors.grey50 }}
        subtitleStyle={{ color: Colors.grey200, fontSize: "16px" }} />
    );

    return (
      <Paper className="info-text-container" zDepth={2}>

        <Helmet
          title={item.section.label}
        />

        <CardMedia
          className="info-title-container"
          mediaStyle={{ minHeight: 100, maxHeight: 500, overflow:"hidden" }}
          overlay={ <Overlay /> }>
          <img src={ imageUrl } />
        </CardMedia>

        <Markdown className="md-info" source={ item.content } />

        <div className="row center-md center-xs">

          { Meteor.user() ?
            <Col xs={8} md={3} className="info-container-col">
              <RaisedButton label="Edit" className="raised-btn" fullWidth={true} primary={true} icon={IconsHelper.materialIcon('mode_edit')} onTouchTap={ () => browserHistory.push(`${window.location.pathname}/edit`) }/>
            </Col>
          : null }

          <Col xs={8} md={3} className="info-container-col">
            <RaisedButton label="Share" className="raised-btn" fullWidth={true} primary={true} icon={IconsHelper.icon('fa fa-facebook-f', {color: "#FFFFFF"})} onTouchTap={ this.makeOpenShareDialog(group,sectionSubtitle) }/>
          </Col>

          <Col xs={8} md={3} className="info-container-col">
            <FacebookProvider appID={Meteor.settings.public.Facebook.appId} >
              <Like href={ absoluteUrl } colorScheme="dark" showFaces />
            </FacebookProvider>
          </Col>

        </div>

      </Paper>
    )
  }

}
