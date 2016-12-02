import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './SubmitForm';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateGroupMessageFromSocket } from 'actions/home';

const mapDispatchToProps = (dispatch) => {
	return {
		updateGroupMessageFromSocket:(message)=>{
			dispatch(updateGroupMessageFromSocket(message))
		}
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		user:state.user,
		socket: ownProps.socket
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
