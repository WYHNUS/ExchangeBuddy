import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import truncate from 'truncate';
var moment = require('moment');
import GoogleMap from 'google-map-react';
import eventimg from '../../../../res/event-img.jpg';
import * as Icons from '../../../../util/icons';

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

class EventItemCreated extends React.Component{
	static defaultProps = {
		center: {lat: 59.938043, lng: 30.337157},
		zoom: 9,
	};

	render() {
		const {groupEvent,groupId} = this.props;
		const cardText = truncate(groupEvent.detail, 300);
		return (
			<div className='row center-xs'>
			<Card className="event-item-card col-xs-10" initiallyExpanded={true}>
			{/*<CardHeader
			className="event-item-header"
			title={ groupEvent.title }
			subtitle={ `${ moment(groupEvent.startTime).format("D MMM, ddd, hA") } - by ${groupEvent.User.name}` }
			avatar={ groupEvent.imgSrc }
			actAsExpander={ true }
			showExpandableButton={ true }
			/>*/}
			<CardMedia
			overlay={<CardTitle title={groupEvent.title} subtitle={`by ${groupEvent.User.name}`}/>} >
			{/*<img src={ groupEvent.imgSrc } />*/}
			<img src={ eventimg } />
			</CardMedia>
			<CardText>
			<div className="col-xs-12">
	        {Icons.FAFixedWidth('clock-o')}<strong>&nbsp; {`${ moment(groupEvent.startTime).format("D MMM, ddd, hA") }`}</strong>
	        </div>
			</CardText>
			<CardText className="event-item-card-text" expandable={true}>
			{ cardText }
			</CardText>
			<CardActions expandable={true}>
			<div className="row center-xs">
			{/*<div className='col-xs-6'>
				<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Post to Chat" onTouchTap={ ()=> postToChat(groupEvent, parseInt(groupId), cardText) } />
				</div>
				*/}

			{ /*Meteor.user()*/
				true ?
				<div className='row center-xs'>
				
				<div className='col-xs-6 col-md-4'>
				<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Go" onTouchTap={ ()=> postToChat(groupEvent, parseInt(groupId), cardText) } />
				</div>
				</div>
				: null }
				</div>
				</CardActions>
				</Card>
				</div>

				);
	}
}

export default EventItemCreated;
