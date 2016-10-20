import React, {PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import truncate from 'truncate';
var moment = require('moment');
import GoogleMap from 'google-map-react';
import eventimg from '../../../../res/event-img.jpg';
import * as Icons from '../../../../util/icons';
import {Link, browserHistory} from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {MemberTile} from '../../Friends/MemberList/MemberList'
import axios from 'axios';
import {ROOT_URL} from '../../../../util/backend';

/*const postToChat = (groupEvent, groupId, cardText) => {
	const {name, coverPicture, startTime, id } = groupEvent;
	const profilePicture = groupEvent.venue.profilePicture || groupEvent.profilePicture;
	const eventPosting = { name, profilePicture, coverPicture, startTime, id };
	const params = { userToken: Meteor.userToken(), userId: Meteor.userId(), groupId, eventPosting, content: cardText, type: "eventFB" };

	Meteor.call('GroupChatMessage.sendToGroup', params, (err, success) => {
		if(err)
			console.log(err)
	})
}*/

const goForAnEvent = (EventId, UserId, showSnackbar,goForAnEventSuccessUpdate) =>{
	//console.log(EventId, UserId, showSnackbar);
	const req = axios.post(`${ROOT_URL}/goToEvent`, 
	{
		EventId: EventId,
		UserId:UserId
	}).then((response)=>{
		if (!response.error){
			showSnackbar("Registered for event");
			goForAnEventSuccessUpdate(EventId);
		}else{
			showSnackbar("Error registering for event");
		}
		//
		//console.log(response);
	})
}

class EventItemCreated extends React.Component{
	state = {
		open: false,
	};
	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};
	static defaultProps = {
		center: {lat: 59.938043, lng: 30.337157},
		zoom: 9,
	};

	render() {
		const actions = [
		<FlatButton
		label="Cancel"
		primary={true}
		keyboardFocused={true}
		onTouchTap={this.handleClose}
		/>
		];
		const {groupEvent,groupId, showSnackbar, user, goForAnEventSuccessUpdate} = this.props;
		const cardText = truncate(groupEvent.detail, 300);
		return (
			<div className='row center-xs'>

			<Dialog
			title={`${groupEvent.going.length} going for ${groupEvent.title}`}
			actions={actions}
			modal={false}
			open={this.state.open}
			onRequestClose={this.handleClose}
			autoScrollBodyContent={true}
			>
			{groupEvent.going.map((user, idx) => <MemberTile user={ user } />)}
			</Dialog>

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
		overlay={<CardTitle 
			title={groupEvent.title} 
			subtitle={ <Link style={{color:"#FFFFFF"}} to={`/profile/${groupEvent.User.id}`}>{`by ${groupEvent.User.name}`}</Link>}/>} >
		{/*<img src={ groupEvent.imgSrc } />*/}
		<img src={ eventimg } />
		</CardMedia>
		<CardText>
		<div className="col-xs-12 event-item-info">
		{Icons.icon('watch_later')}<span>&nbsp; {
			`${moment(groupEvent.startTime).format("D MMM, ddd, hA")} to ${moment(groupEvent.endTime).format("D MMM, ddd, hA")}`}</span>
			</div>
			<div className="col-xs-12 event-item-info">
			{Icons.icon('place')}<span>&nbsp; {}</span>
			</div>
			<div className="col-xs-12 event-item-info">
			{Icons.icon('group')}<span>&nbsp; <span id='link' onClick={this.handleOpen}>{`${groupEvent.going.length} people going`}</span></span>
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
				<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Go for event" 
				onTouchTap={ ()=> 
					goForAnEvent(groupEvent.id, user.userObject.userId, showSnackbar, goForAnEventSuccessUpdate)} />
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


EventItemCreated.propTypes = {
  groupEvent: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  goForAnEventSuccessUpdate: PropTypes.func.isRequired
  //fetchEvents: PropTypes.func.isRequired
};

export default EventItemCreated;
