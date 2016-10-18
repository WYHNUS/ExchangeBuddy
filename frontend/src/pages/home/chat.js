import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';
import {updateGroupMessageFromSocket} from '../../actions/home';

import SubmitForm from '../../components/HomeComponent/Chat/SubmitForm';
import MessageList from '../../components/HomeComponent/Chat/MessageList';
import {ROOT_URL} from '../../util/backend';

var socket = io.connect(ROOT_URL);

class Chat extends React.Component{

	componentWillMount(){

		//if there is group id to join
		if(this.props.homeGroupDetails.detailsLoaded){
			
			socket.emit('adduser',
			{
				group:
				{
					name: this.props.homeGroupDetails.homeGroupDetails.name
				},
				user:
				{
					id:parseInt(this.props.user.userObject.userId)
				}
			}
			);
		}
		
	}

	componentDidMount(){

	}

	componentWillUnmount(){
		socket.emit('disconnect');
	}

	render(){
		return(
			<Grid>
			<div className="chat-container">
			<MessageList />
			<SubmitForm socket={socket}/>
			</div>
			</Grid>);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ showSnackbar }, dispatch)
	};
};

const mapStateToProps = (state)=>{
	return {
		homeGroupDetails: state.home.homeGroupDetails,
		user: state.user
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);