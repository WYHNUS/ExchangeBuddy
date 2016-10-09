import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
var moment = require('moment');

const postToChat = (groupEvent, groupId, cardText) => {
  const { name, time, description, event_url, yes_rsvp_count } = groupEvent;
  const eventPosting = { name, startTime: time, url: event_url, yes_rsvp_count };
  const params = { userToken: Meteor.userToken(), userId: Meteor.userId(), groupId, eventPosting, content: description, type: "eventMU" };

  Meteor.call('GroupChatMessage.sendToGroup', params, (err, success) => {
    if(err)
      console.log(err)
  })
}

const EventItemMu = ({ groupEvent, groupId }) => (
  <Row>
    <Col xs={12}>
      <Card className="event-item-card" initiallyExpanded={true}>
        <CardHeader
          title={ groupEvent.name }
          subtitle={ `${ moment(groupEvent.time).format("D MMM, ddd, hA") } - ${groupEvent.yes_rsvp_count} RSVPs` }
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText className="event-item-text" expandable={true}>
        	{ ReactHtmlParser(truncate(groupEvent.description, 500)) }
        </CardText>
        <CardActions expandable={true}>
          <div className="row center-xs">
            <Col xs={12} md={5} >
              <RaisedButton backgroundColor="#E0393D" labelColor="#FFFFFF" style={{margin: "3px 6px"}} label="View on Meetup.com" target="_blank" href={groupEvent.event_url} />
            </Col>
              { /*Meteor.user()*/ true?
                <Col xs={12} md={4} >
                  <RaisedButton backgroundColor="#E0393D" labelColor="#FFFFFF" style={{margin: "3px 6px"}} label="Post to Chat" onTouchTap={ ()=> postToChat(groupEvent, parseInt(groupId), groupEvent.description) } />
                </Col>
              : null }
          </div>
        </CardActions>

      </Card>
    </Col>
  </Row>
)

export default EventItemMu;
