import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';

import SubmitForm from '../../components/HomeComponent/Chat/SubmitForm';
import MessageList from '../../components/HomeComponent/Chat/MessageList';

class Chat extends React.Component{

	componentWillMount(){
		/*var socket = io.connect("http://localhost:3001");
		socket.emit('adduser',
		{
			group:
			{
				name: 'alkdsjfhaldsjkafhlkdsj'
			},
			user:
			{
				id:1	
			}
		}
		);*/
	}

	componentDidMount(){

	}

	componentWillUnmount(){
		
	}

	render(){
		return(
		<Grid>
		<div className="chat-container">
		<MessageList groupId={ parseInt(this.props.params.id) } />
		<SubmitForm groupId={ parseInt(this.props.params.id) } />
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
		params: state.home.homeGroupDetails.homeGroupDetails
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);