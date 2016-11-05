import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';
import {updateGroupMessageFromSocket,resetGroupMessages} from '../../actions/home';
import {toggleHomeTab} from '../../actions/home';

import SubmitForm from '../../components/HomeComponent/Chat/SubmitForm';
import MessageList from '../../components/HomeComponent/Chat/MessageList';
import {ROOT_URL} from '../../util/backend';
import Socket from '../../util/socket';
import * as GroupHelper from '../../util/group';

import {browserHistory} from 'react-router';

/*var socket = io.connect(ROOT_URL);

socket.on('updatechat', function(msg){
	console.log('msg2', msg);
})*/


const socket = new Socket();


class Chat extends React.Component{

	componentWillMount(){
		this.props.toggleHomeTab('chat');	
		this.props.resetGroupMessages();	
	}

	componentDidMount(){
		//if there is group id to join
		if(this.props.homeGroupDetails.detailsLoaded){

			if(!socket.isFirstTimeUse){
				socket.setup(
					this.props.homeGroupDetails.homeGroupDetails.name,
					parseInt(this.props.homeGroupDetails.homeGroupDetails.id),
					this.props.user.userObject.name,
					parseInt(this.props.user.userObject.id),
					this.chatReceive.bind(this)
				)

			}else if(!(socket.currentRoom===parseInt(this.props.homeGroupDetails.homeGroupDetails.id))){
				socket.updateRoom(
					this.props.homeGroupDetails.homeGroupDetails.name,
					parseInt(this.props.homeGroupDetails.homeGroupDetails.id)
				)
			}		
			
			/*var emittedobj = 
			{
				group:
				{
					name: this.props.homeGroupDetails.homeGroupDetails.name,
					id: parseInt(this.props.homeGroupDetails.homeGroupDetails.id)
				},
				user:
				{
					id:parseInt(this.props.user.userObject.userId),
					name: this.props.user.userObject.name
				}
			}

			socket.emit('adduser',emittedobj);*/
		}
	}


	chatReceive(data){
		console.log('rceived data', data);
		this.props.updateGroupMessageFromSocket(data);
	}

	componentWillUnmount(){
		//socket.emit('disconnect');
		//socket.uninstall();
	}

	render(){

		const { homeGroupDetails } = this.props.homeGroupDetails;
	    const {userObject} = this.props.user;

		var userPartOfGroup = GroupHelper.isUserPartOfGroup(userObject.id,homeGroupDetails.user);

		return(
	
			<div className="chat-container">

				{
					(userPartOfGroup)?
					(<SubmitForm socket={socket}/>)
					:
					(
						<div className='row center-xs'>
							<h2>Join the group to join in the coversation!</h2>
						</div>
					)
				}

				<MessageList />

			</div>
	
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ showSnackbar }, dispatch),
		updateGroupMessageFromSocket:(message)=>{
			dispatch(updateGroupMessageFromSocket(message))
		},
		toggleHomeTab:(tab)=>dispatch(toggleHomeTab(tab)),
		resetGroupMessages:()=>{dispatch(resetGroupMessages())}

	};
};

const mapStateToProps = (state)=>{
	return {
		homeGroupDetails: state.home.homeGroupDetails,
		user: state.user,
		homeMessages: state.home.homeMessages
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);