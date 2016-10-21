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
import {fetchAllUniversities} from '../../../../actions/utilityInfo';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
const styles = {
	customWidth: {
		width: 150,
	},
};


class EventItemCreated extends React.Component{
	state = {
		open: false,
		value:1
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


	updateListWithUniversities(){
		const{fetchAllUniversitiesSuccess, groupEvent,
			fetchAllUniversitiesFailure, universities, showSnackbar}=this.props;
			if(universities.length<2){
				fetchAllUniversities().payload.then((response) => {
					if (!response.error) {
						fetchAllUniversitiesSuccess(response.data);
						return (this.insertUniversitiesIntoList(groupEvent.going,response.data));
					} else {
						fetchAllUniversitiesFailure(response.error);
						showSnackbar(response.error);
						return (<h2>Error opening attendees</h2>)
					}
				})
			}else{
				var finalArray = this.insertUniversitiesIntoList(groupEvent.going,universities);
				console.log('return value',finalArray);
				return finalArray;
			}
		}

		insertUniversitiesIntoList(goingArray, universities){
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
					id: goingArray[j].UniversityId
				};
				finalArray.push(goingArray[j]);
			}
			console.log('insertion',finalArray);
			return finalArray;
		};

		goForAnEvent(EventId, UserId, showSnackbar,goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents){
			//console.log(EventId, UserId, showSnackbar);
			const req = axios.post(`${ROOT_URL}/goToEvent`, 
			{
				EventId: EventId,
				UserId:UserId
			}).then((response)=>{
				//console.log(homeGroupDetails.id);
				if ((!response.error)&&homeGroupDetails.id){
					//showSnackbar("Registered for event");
					//goForAnEventSuccessUpdate(EventId, UserId);
					fetchEvents(homeGroupDetails.id);
				}else{
					showSnackbar("Error registering for event");
				}
				//
				//console.log(response);
			})
		};

		ungoForAnEvent(EventId, UserId, showSnackbar,ungoForAnEventSuccessUpdate, homeGroupDetails, fetchEvents){
			//console.log(EventId, UserId, showSnackbar);
			const req = axios.post(`${ROOT_URL}/unattend`, 
			{
				EventId: EventId,
				UserId:UserId
			}).then((response)=>{
				//console.log(homeGroupDetails.id);
				if  ((!response.error)&&homeGroupDetails.id){
					//showSnackbar("Unregistered for event");
					//ungoForAnEventSuccessUpdate(EventId, UserId);
					fetchEvents(homeGroupDetails.id);
				}else{
					showSnackbar("Error unregistering for event");
				}
				//
				//console.log(response);
			})
		};

		handleChangeGoing = (event,index,value) => {
			const {groupEvent,homeGroupDetails, showSnackbar, user, goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,fetchEvents} = this.props;
			if(value===1){
				this.ungoForAnEvent(groupEvent.id, user.userObject.userId, showSnackbar, goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents);
				this.setState({value:value});
			}
			else if(value===2){
				this.goForAnEvent(groupEvent.id, user.userObject.userId, showSnackbar, goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents);
				this.setState({value:value});
			}
		}

		render() {
			const actions = 
			[
			<FlatButton
			label="Cancel"
			primary={true}
			keyboardFocused={true}
			onTouchTap={this.handleClose}
			/>
			];

			const {groupEvent,homeGroupDetails, showSnackbar, user, 
				goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,
				fetchEvents, universities} = this.props;
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
					{ 
						this.updateListWithUniversities()
						.map((user, idx) => <MemberTile key={ idx } user={ user } />) 
					}
					</Dialog>

					<Card className="event-item-card col-xs-10" initiallyExpanded={true}>
					<CardTitle 
					title={ groupEvent.title }
					subtitle={  <Link id='link' to={`/profile/${groupEvent.User.id}`}>{`by ${groupEvent.User.name}`}</Link>} />
					<CardText>
					<div className="col-xs-12 event-item-info">
					{Icons.icon('watch_later')}<span>&nbsp; {
						`${moment(groupEvent.startTime).format("D MMM, ddd, hA")} to ${moment(groupEvent.endTime).format("D MMM, ddd, hA")}`}</span>
						</div>
						<div className="col-xs-12 event-item-info">
						{Icons.icon('place')}<span>&nbsp; 
						<a href={`http://maps.google.com/maps?q=loc:${groupEvent.lat},${groupEvent.lng}`}>
						<span style={{marginLeft:'3px',fontWeight:'bold',color:'darkgrey',textDecoration:'underline'}}>{`${groupEvent.location}`}</span>
						</a></span>
						</div>
						<div className="col-xs-12 event-item-info">
						{Icons.icon('group')}<span>&nbsp; <span id='link' onClick={this.handleOpen}>{`${groupEvent.going.length} going`}</span></span>
						</div>
						</CardText>
						<CardText className="event-item-card-text" expandable={true}>
						{ cardText }
						</CardText>
						<CardActions expandable={true}>
						<div className="row center-xs">

						{ /*Meteor.user()*/
							true ?
							<div className='row center-xs'>
							<div className='col-xs-6 col-md-4'>
							<SelectField
							value={this.state.value}
							onChange={this.handleChangeGoing}
							>
							<MenuItem value={1} primaryText="Not going" />
							<MenuItem value={2} primaryText="Going" />
							</SelectField>

							</div>


							{/*<div className='col-xs-6 col-md-4'>
														<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Go" 
														onTouchTap={ ()=> 
															goForAnEvent(groupEvent.id, user.userObject.userId, showSnackbar, goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents)} />
															</div>
															<div className='col-xs-6 col-md-4'>
															<RaisedButton primary={true} style={{margin: "1px 6px"}} label="Ungo for event" 
															onTouchTap={ ()=> 
																ungoForAnEvent(groupEvent.id, user.userObject.userId, showSnackbar, ungoForAnEventSuccessUpdate, homeGroupDetails, fetchEvents)} />
															</div>*/}

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
