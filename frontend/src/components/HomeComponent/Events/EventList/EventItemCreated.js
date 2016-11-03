import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import truncate from 'truncate';
import cookie from 'react-cookie';

var moment = require('moment');
import GoogleMap from 'google-map-react';
import eventimg from '../../../../res/event-img.jpg';
import * as Icons from '../../../../util/icons';
import { Link, browserHistory } from 'react-router';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {MemberTile} from '../../Friends/MemberList/MemberList'

import request from 'superagent';
import { bearer } from '../../../../util/bearer';
import { ROOT_URL } from '../../../../util/backend';
import { fetchAllUniversities } from '../../../../actions/utilityInfo';
import * as UniversityHelper from '../../../../util/university';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

const styles = {
	customWidth: {
		width: 150,
	},
};

const paperStyle = {
	width: 100,
	textAlign: 'center',
	display: 'inline-block',
};


class EventItemCreated extends React.Component{
	state = {
		open: false,
		value:1,
		peopleList:[],
		peopleListLoaded:false,
		userIsGoing:false,
		isDialogOpen:false
	};

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	closeDeleteDialog = () =>{
		this.setState({isDialogOpen:false});
	};

	openDeleteDialog = () =>{
		this.setState({isDialogOpen:true});
	};

	//fetch and render list of people to display here
	componentWillMount(){
		//console.log('event class mounted', universities);
		const{fetchAllUniversitiesSuccess, groupEvent, fetchAllUniversitiesFailure, universities, showSnackbar}=this.props;
		if(universities.length<2){
			fetchAllUniversities().payload.then((response) => {
				if (!response.error) {
					fetchAllUniversitiesSuccess(response.data);
					var finalArray = UniversityHelper.insertUniversitiesIntoList(groupEvent.going,response.data);
					this.setState({
						peopleList:finalArray,
						peopleListLoaded:true
					});
				} else {
					fetchAllUniversitiesFailure(response.error);
					//showSnackbar(response.error);
					this.setState({
						peopleListLoaded:false
					});
				}
			})
		}else{
			var finalArray = UniversityHelper.insertUniversitiesIntoList(groupEvent.going,universities);
			this.setState({
				peopleListLoaded: true,
				peopleList:finalArray
			});
		}
		this.detectIfUserGoing();
	}

	detectIfUserGoing(){
		const {user, groupEvent} = this.props;
		var isGoing = false;
		for (var i=0; i<groupEvent.going.length; i++) {
			if (groupEvent.going[i].id === user.userObject.id) {
				isGoing=true;
			}
		}
		this.setState({
			userIsGoing:isGoing
		})
	}

	goForAnEvent(EventId, UserId, showSnackbar,goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents){
		//console.log(EventId, UserId);
		const req = request
			.post(ROOT_URL + '/goToEvent')
			.send({ 
				EventId: EventId,
				UserId:UserId
			})
			.use(bearer)
			.end(function(err,res){
				console.log(res);
				if (res.status === 401) {
					cookie.remove('authToken');
					this.props.clearUser();
					// need to redirect to a new version of login page
					browserHistory.push('/');
		        } 
				//console.log(homeGroupDetails.id);
				if (!err && !res.error && homeGroupDetails.id){
					//showSnackbar("Registered for event");
					//goForAnEventSuccessUpdate(EventId, UserId);
					fetchEvents(homeGroupDetails.id);
				} else {
					showSnackbar("Error registering for event");
				}
			});
	};

	ungoForAnEvent(EventId, UserId, showSnackbar,ungoForAnEventSuccessUpdate, homeGroupDetails, fetchEvents){
		//console.log(EventId, UserId, showSnackbar);
		//console.log(EventId, UserId);
		const req = request
			.post(ROOT_URL + '/unattend')
			.send({ 
				EventId: EventId,
				UserId:UserId
			})
			.use(bearer)
			.end(function(err,res){
				console.log(res);
				if (res.status === 401) {
					cookie.remove('authToken');
					this.props.clearUser();
					// need to redirect to a new version of login page
					browserHistory.push('/');
		        } 
				//console.log(homeGroupDetails.id);
				if (!err && !res.error && homeGroupDetails.id){
					//showSnackbar("Unregistered for event");
					//ungoForAnEventSuccessUpdate(EventId, UserId);
					fetchEvents(homeGroupDetails.id);
				} else {
					showSnackbar("Error unregistering for event");
				}
			});
	};

	handleChangeGoing(){
		const {groupEvent,homeGroupDetails, showSnackbar, user, goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,fetchEvents} = this.props;
		if(this.state.userIsGoing){
			this.ungoForAnEvent(groupEvent.id, user.userObject.id, showSnackbar, 
				goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents);
		}
		else{
			this.goForAnEvent(groupEvent.id, user.userObject.id, showSnackbar, 
				goForAnEventSuccessUpdate, homeGroupDetails, fetchEvents);
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

		const deleteActions = [
	      <FlatButton label="Cancel" primary={true} 
	      onTouchTap={(e)=>{e.preventDefault();this.closeDeleteDialog}} />,
	      <FlatButton label="Delete" primary={true} 
	      onTouchTap={(e)=>{e.preventDefault();this.closeDeleteDialog}} />,
	    ];

		const {groupEvent,homeGroupDetails, showSnackbar, user, 
			goForAnEventSuccessUpdate, ungoForAnEventSuccessUpdate,
			fetchEvents, universities} = this.props;
			const cardText = truncate(groupEvent.detail, 300);
			return (
				<div className='row center-xs'>

				<Dialog actions={deleteActions} modal={false} open={this.state.isDialogOpen} 
					onRequestClose={this.closeDeleteDialog}>
		          Delete the event forever?
		        </Dialog>

				<Dialog
				title={`${groupEvent.going.length} going for ${groupEvent.title}`}
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={this.handleClose}
				autoScrollBodyContent={true}
				>
				{
					this.state.peopleListLoaded? 
					(this.state.peopleList.map((user, idx) => <MemberTile key={ idx } user={ user } />)):
					(<h2>Error loading list of people going...</h2>)
				}
				</Dialog>

				<Card className="event-item-card col-xs-11 col-md-11" initiallyExpanded={true}>
					<CardTitle
					className="event-item-card-title" 
					title={ groupEvent.title }
					showExpandableButton={true}
					actAsExpander={true}
					subtitle={  <Link id='link-title' to={`/profile/${groupEvent.User.id}`}>
					{`by ${groupEvent.User.name}`}</Link>} />
					<CardText>
						<div className="col-xs-12 event-item-info">
							{Icons.icon('watch_later')}<span>&nbsp; {
							`${moment(groupEvent.startTime).format("D MMM, ddd, hA")} to 
							${moment(groupEvent.endTime).format("D MMM, ddd, hA")}`}</span>
						</div>
						<div className="col-xs-12 event-item-info">
							{Icons.icon('place')}<span>&nbsp; 
							<a href={`http://maps.google.com/maps?q=loc:${groupEvent.lat},${groupEvent.lng}`}>
								<span style={{marginLeft:'3px',fontWeight:'bold',color:'darkgrey',textDecoration:'underline'}}>
								{`${groupEvent.location}`}</span>
							</a></span>
						</div>
						<div className="col-xs-12 event-item-info">
							{Icons.icon('group')}<span>&nbsp; <span id='link' onClick={this.handleOpen}>
							{`${groupEvent.going.length} going`}</span></span>
						</div>
					</CardText>
					<CardText className="event-item-card-text" expandable={true}>
						{ cardText }
					</CardText>
					<CardActions expandable={true}>
						{ 
							true ?
								<div className='row center-xs'>
									<div className='col-xs-6 col-md-4'>
										<Paper style={paperStyle} zDepth={1}>
											<Checkbox
											className='event-item-card-going-button'
											label="GOING"
											checked={this.state.userIsGoing}
											onTouchTap={()=>this.handleChangeGoing()}
											/>
										</Paper>
									</div>
								</div>
							: null 
						}
						{	
							/*(parseInt(this.props.user.userObject.id)==parseInt())*/
							<div className="edit-delete-btn">
						      <IconButton tooltipPosition="bottom-center" tooltip="Edit" 
						      onTouchTap={()=>goToEdit(props)}>
						        {Icons.icon('mode_edit')}
						      </IconButton>
						      <IconButton tooltipPosition="bottom-center" tooltip="Delete" 
						      onTouchTap={()=>this.openDeleteDialog()} >
						        {Icons.icon('delete')}
						      </IconButton>
					        </div>
						}
					</CardActions>
				</Card>

				</div>
			);
		}
	}
	const goToEdit = props => {
	  browserHistory.push('/edit/'+props.dropId);
	  props.selectedDropSrc('profile');
	  props.selectedDropIdx(props.idx);
	};


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
