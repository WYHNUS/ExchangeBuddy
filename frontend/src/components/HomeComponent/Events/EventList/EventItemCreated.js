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
import {fetchAllUniversities} from '../../../../actions/utilityInfo'

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

const goForAnEvent = (EventId, UserId, showSnackbar,goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents) =>{
	//console.log(EventId, UserId, showSnackbar);
	const req = axios.post(`${ROOT_URL}/goToEvent`, 
	{
		EventId: EventId,
		UserId:UserId
	}).then((response)=>{
		//console.log(homeGroupDetails.id);
		if ((!response.error)&&homeGroupDetails.id){
			showSnackbar("Registered for event");
			//goForAnEventSuccessUpdate(EventId, UserId);
			fetchEvents(homeGroupDetails.id);
		}else{
			showSnackbar("Error registering for event");
		}
		//
		//console.log(response);
	})
}

const ungoForAnEvent = (EventId, UserId, showSnackbar,ungoForAnEventSuccessUpdate, homeGroupDetails, fetchEvents) =>{
	//console.log(EventId, UserId, showSnackbar);
	const req = axios.post(`${ROOT_URL}/unattend`, 
	{
		EventId: EventId,
		UserId:UserId
	}).then((response)=>{
		//console.log(homeGroupDetails.id);
		if  ((!response.error)&&homeGroupDetails.id){
			showSnackbar("Unregistered for event");
			//ungoForAnEventSuccessUpdate(EventId, UserId);
			fetchEvents(homeGroupDetails.id);
		}else{
			showSnackbar("Error unregistering for event");
		}
		//
		//console.log(response);
	})
}

const updateGoingListWithUniversities=({goingArray, universities})=>{
	//
	var finalArray = [];
	for(var j=0;j<goingArray.length;j++){
		var uniName = "";
		for(var i=0;i<universities.length;i++){
			if(universities[i].id===goingArray[j].UniversityId){
				uniName = universities[i].name;
				break;
			}
		}
		goingArray[j].University = 
		{
			name: uniName,
			id: user.UniversityId
		};
		finalArray.push(goingArray[j]);
	}
	
	return (finalArray.map((user, idx)=>{<MemberTile user={ user } />}))
}

/*groupEvent.going.map((user, idx) => <MemberTile user={ user } />)*/

//fetch and store universities if they are not already fetched
class EventItemUsers extends React.Component{
	render(){
		const {groupEvent, universities, fetchAllUniversitiesSuccess, 
			fetchAllUniversitiesFailure, showSnackbar} = this.props;
			//console.log(groupEvent, universities)
		if(universities.length<2){
			fetchAllUniversities().payload.then((response) => {
	        if (!response.error) {
	          fetchAllUniversitiesSuccess(response.data);
	          console.log(groupEvent.going,response.data);
	          return (updateGoingListWithUniversities(groupEvent.going,response.data));
	        } else {
	          fetchAllUniversitiesFailure(response.error);
	          showSnackbar(response.error);
	          return (<h2>Error opening attendees</h2>)
		    }
	      })
		}else{
			//console.log(groupEvent.going,universities);
			return (updateGoingListWithUniversities(groupEvent.going,universities));
		}
	}
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

		const {groupEvent,homeGroupDetails, showSnackbar, user, 
			goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,
			fetchEvents, fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure,
			universities} = this.props;
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
			{<EventItemUsers
				groupEvent={groupEvent}
				universities={universities}
				fetchAllUniversitiesSuccess={fetchAllUniversitiesSuccess}
				fetchAllUniversitiesFailure={fetchAllUniversitiesFailure}
				showSnackbar={showSnackbar}
				/>}
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
				<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Post to Chat" onTouchTap={ ()=> postToChat(groupEvent, parseInt(homeGroupDetails), cardText) } />
				</div>
			*/}

			{ /*Meteor.user()*/
				true ?
				<div className='row center-xs'>
				
				<div className='col-xs-6 col-md-4'>
				<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Go for event" 
				onTouchTap={ ()=> 
					goForAnEvent(groupEvent.id, user.userObject.userId, showSnackbar, goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents)} />
				</div>
				<div className='col-xs-6 col-md-4'>
				<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Ungo for event" 
				onTouchTap={ ()=> 
					ungoForAnEvent(groupEvent.id, user.userObject.userId, showSnackbar, ungoForAnEventSuccessUpdate, homeGroupDetails, fetchEvents)} />
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
  homeGroupDetails: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  goForAnEventSuccessUpdate: PropTypes.func.isRequired,
  ungoForAnEventSuccessUpdate: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchAllUniversitiesSuccess:PropTypes.func.isRequired,
  fetchAllUniversitiesFailure:PropTypes.func.isRequired,
  universities:PropTypes.array.isRequired
};

export default EventItemCreated;
