import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../../Loading';

// Component
import ChildComponent from './SubmitForm';

// react-komposer
/*const composer = (props, onData) => {
  const user = Meteor.user();

  onData(null, { user });
};*/

//const ComposedComponent = composeWithTracker(Loading)(ChildComponent);

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
