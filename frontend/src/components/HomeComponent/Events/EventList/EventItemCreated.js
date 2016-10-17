import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import truncate from 'truncate';
var moment = require('moment');
import GoogleMap from 'google-map-react';

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
			<Card className="event-item-card col-xs" initiallyExpanded={true}>
			<CardHeader
			className="event-item-header"
			title={ groupEvent.name }
			subtitle={ `${ moment(groupEvent.startTime).format("D MMM, ddd, hA") } - by ${groupEvent.user.name}` }
			avatar={ groupEvent.imgSrc }
			actAsExpander={ true }
			showExpandableButton={ true }
			/>
			<CardMedia expandable={true} >
			<img src={ groupEvent.imgSrc } />
			</CardMedia>
			<CardText expandable={true}>
			{ cardText }
			</CardText>
			<CardActions expandable={true}>
			<div className="row center-xs">
			{ /*Meteor.user()*/
				true ?
				<div className='col-xs-4'>
				<RaisedButton primary={true} style={{margin: "3px 6px"}} label="Post to Chat" onTouchTap={ ()=> postToChat(groupEvent, parseInt(groupId), cardText) } />
				</div>
				: null }
				</div>
				</CardActions>
				</Card>
				<GoogleMap
				defaultCenter={this.props.center}
				defaultZoom={this.props.zoom}>
				</GoogleMap>
				</div>
				
				);
	}
} 

export default EventItemCreated;
