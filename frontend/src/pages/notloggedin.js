import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { toggleBottomBarVisibility, toggleTopBarVisibility } from '../actions/pageVisibility';

class NotLoggedIn extends React.Component{
	redirect() {
		setTimeout(function() {
		  browserHistory.push('/');
		}, 2000);
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(false);
		this.props.toggleTopBarVisibility(true);
		this.redirect();
	}

	render() {
		return (
			<div id="not-logged-in-text-container">
				<p>You are not logged in yet.</p>
				<p>Redirecting to the home page for logging in...</p>
			</div>
		);
	}

}
const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility))
	};
};

export default connect(null, mapDispatchToProps)(NotLoggedIn);