import React, {PropTypes} from 'react';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ReactHtmlParser from 'react-html-parser';
import truncate from 'truncate';
import Linkify from 'react-linkify';
import Spinner from 'react-spinkit';

import { formatTime } from 'util/helper';
import * as UserHelper from 'util/user';

class MessageUser extends React.Component{
  render() {
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
  render() {
    const { message, User, createdAt, id } = this.props.message;
    return (
      <div>
        <div className="message-row">
          <div className="message-avatar">{ UserHelper.getAvatar(User, 40) }</div>
          <MessageUser message={this.props.message} />
        </div>
      </div>
    );
  }
}

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.homeGroupDetails.detailsLoaded){
      this.props.fetchGroupMessages(this.props.homeGroupDetails.homeGroupDetails.id);
    }
  }

  render() {
    const { user } = this.props;
    const { homeMessages, loading, error } = this.props.homeMessages;

    if (loading) {
      return <Spinner spinnerName="circle" />       
    } else if (error) {
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


