var moment = require('moment');

import React, {PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
import Linkify from 'react-linkify';

import { formatTime } from '../../../../util/helper';
import * as UserHelper from '../../../../util/user';

const MessageFBEvent = ({ message }) => {
  const { content, user, createdAt, type, eventPosting, id } = message;

  return (
    <div className="message-body">
    <h5 className="message-username">{ user.name } posted an event <span className="message-timestamp"> { formatTime(createdAt) }</span></h5>
    <Card className="event-item-card" style={{maxWidth: "512px"}}>
    <CardHeader title={ eventPosting.name } subtitle={ `${ moment(eventPosting.startTime).format("D MMM, ddd, hA") }` } avatar={ eventPosting.profilePicture } actAsExpander={ true } showExpandableButton={ true } />
    <CardMedia expandable={true} >
    <img src={ eventPosting.coverPicture } />
    </CardMedia>
    <CardText expandable={true}>
    { content }
    </CardText>
    <CardActions expandable={true}>
    <RaisedButton primary={true} style={{ margin: "3px 6px" }} label="View on Facebook" target="_blank" href={`https://facebook.com/events/${eventPosting.id}`} />
    </CardActions>
    </Card>
    </div>
    );
};

const MessageMUEvent = ({ message }) => {
  const { content, user, createdAt, type, eventPosting, id } = message;

  return (
    <div className="message-body">
    <h5 className="message-username">{ user.name } posted an event <span className="message-timestamp"> { formatTime(createdAt) }</span></h5>
    <Card className="event-item-card" style={{maxWidth: "512px"}}>
    <CardHeader title={ eventPosting.name } actAsExpander={true} showExpandableButton={true} subtitle={ `${ moment(eventPosting.time).format("D MMM, ddd, hA") } - ${eventPosting.yes_rsvp_count} RSVPs` } />
    <CardText className="event-item-text" expandable={true}>
    { ReactHtmlParser(truncate(content, 500)) }
    </CardText>
    <CardActions expandable={true}>
    <RaisedButton backgroundColor="#E0393D" labelColor="#FFFFFF" style={{margin: "3px 6px"}} label="View on Meetup.com" target="_blank" href={eventPosting.url} />
    </CardActions>
    </Card>
    </div>
    );
};

class MessageUser extends React.Component{
  render(){
    const { message, User, createdAt, id } = this.props.message;
    return (
      User?(<div className="message-body">
        <h5 className="message-username">{ User.name } <span className="message-timestamp">{ formatTime(createdAt) }</span></h5>
        <p className="message-content">
        <Linkify>{ message }</Linkify>
        </p>
        </div>):null
      
      );
  }
}

class Message extends React.Component{
  render(){
    const { message, User, createdAt, id } = this.props.message;
    return (
      <div>
      <div className="message-row">
      <div className="message-avatar">{ UserHelper.getAvatar(User, 40) }</div>
      <MessageUser message={this.props.message} />

      {
      /*type === "user" ? <MessageUser message={message} />
      : type === "eventFB" ? <MessageFBEvent message={message} />
      : type === "eventMU" ? <MessageMUEvent message={message} />
      : null*/
    }
    </div>
    </div>
    )
  }
}

const chatScrollToLatest = () => {
  $('.messages-container').scrollTop($('.messages-container')[0].scrollHeight);
};

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.homeGroupDetails.detailsLoaded){
      //console.log('id', this.props.homeGroupDetails.homeGroupDetails.id);
      this.props.fetchGroupMessages(this.props.homeGroupDetails.homeGroupDetails.id);
    }
    //chatScrollToLatest();
  }

  componentDidUpdate() {
    //chatScrollToLatest();
  }

  render() {
    const { user } = this.props;
    const {homeMessages, loading, error} = this.props.homeMessages;

    if(loading) {
      return <div className="container"><h1>Message</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="messages-container">
      { (homeMessages.length > 0)?
        (homeMessages.map((message, idx) => <Message message={ message } key={ idx } />))
        :
        (<h2>Talk to get to know the people in your group!</h2>) }
      </div>
      )
  }
}

MessageList.propTypes = {
  homeMessages: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  fetchGroupMessages: PropTypes.func.isRequired,
  homeGroupDetails: PropTypes.object.isRequired
};


