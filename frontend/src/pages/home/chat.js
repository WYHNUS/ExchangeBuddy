import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';
import {updateGroupMessageFromSocket} from '../../actions/home';
import {toggleHomeTab} from '../../actions/home';

import SubmitForm from '../../components/HomeComponent/Chat/SubmitForm';
import MessageList from '../../components/HomeComponent/Chat/MessageList';
import {ROOT_URL} from '../../util/backend';
import Socket from '../../util/socket';

/*var socket = io.connect(ROOT_URL);

socket.on('updatechat', function(msg){
	console.log('msg2', msg);
})*/


const socket = new Socket();


class Chat extends React.Component{

	componentWillMount(){
		this.props.toggleHomeTab('chat');		
	}

	componentDidMount(){
		//if there is group id to join
		if(this.props.homeGroupDetails.detailsLoaded){

			socket.setup(
				this.props.homeGroupDetails.homeGroupDetails.name,
				parseInt(this.props.homeGroupDetails.homeGroupDetails.id),
				this.props.user.userObject.name,
				parseInt(this.props.user.userObject.userId),
				this.chatReceive.bind(this)
			)
			
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
		socket.uninstall();
	}

	render(){
		return(
			<Grid>
			<div className="chat-container">
			<SubmitForm socket={socket}/>
			<MessageList />
			</div>
			</Grid>);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ showSnackbar }, dispatch),
		updateGroupMessageFromSocket:(message)=>{
			dispatch(updateGroupMessageFromSocket(message))
		},
		toggleHomeTab:(tab)=>dispatch(toggleHomeTab(tab))

	};
};

const mapStateToProps = (state)=>{
	return {
		homeGroupDetails: state.home.homeGroupDetails,
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);