import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import truncate from 'truncate';
var moment = require('moment');

const postToChat = (groupEvent, groupId, cardText) => {
  const {name, coverPicture, startTime, id } = groupEvent;
  const profilePicture = groupEvent.venue.profilePicture || groupEvent.profilePicture;
  const eventPosting = { name, profilePicture, coverPicture, startTime, id };
  const params = { userToken: Meteor.userToken(), userId: Meteor.userId(), groupId, eventPosting, content: cardText, type: "eventFB" };

  Meteor.call('GroupChatMessage.sendToGroup', params, (err, success) => {
    if(err)
      console.log(err)
  })
}

const EventItemFb = ({ groupEvent, groupId }) => {
  const cardText = truncate(groupEvent.description, 300);
  return (
  <Row>
    <Col xs={12}>
      <Card className="event-item-card" initiallyExpanded={true}>
        <CardHeader
          title={ groupEvent.name }
          subtitle={ `${ moment(groupEvent.startTime).format("D MMM, ddd, hA") } - ${groupEvent.stats.attending} attending` }
          avatar={ groupEvent.venue.profilePicture || groupEvent.profilePicture }
          actAsExpander={ true }
          showExpandableButton={ true }
        />
        <CardMedia expandable={true} >
          <img src={ groupEvent.coverPicture } />
        </CardMedia>
        <CardText expandable={true}>
        	{ cardText }
        </CardText>
        <CardActions expandable={true}>
          <div className="row center-xs">
          <Col xs={12} md={5}>
            <RaisedButton primary={true} style={{margin: "3px 6px"}} label="View on Facebook" target="_blank" href={`https://facebook.com/events/${groupEvent.id}`} />
          </Col>
            { /*Meteor.user()*/true ?
              <Col xs={12} md={4}>
                <RaisedButton primary={true} style={{margin: "3px 6px"}} label="Post to Chat" onTouchTap={ ()=> postToChat(groupEvent, parseInt(groupId), cardText) } />
              </Col>
            : null }
          </div>
        </CardActions>
      </Card>
    </Col>
  </Row>
  )
}

export default EventItemFb;
