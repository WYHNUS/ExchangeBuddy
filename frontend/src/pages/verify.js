import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

// Action creators
import { verifyToken, verifyTokenSuccess, verifyTokenFail } from '../actions/authActions';


class Verify extends React.Component{

	componentDidMount() {
		// this.props.toggleBottomBarVisibility(true);
		console.log(this.props.routeParams.token);
		this.props.verifyToken(this.props.routeParams.token);
	}

	redirect() {
		setTimeout(function() {
		  browserHistory.push('/home');
		}, 3000);
	}

	render() {
		const { error, isVerified } = this.props; 

		if (isVerified) {
			this.redirect();
		}

		return (
			<div>
	        	<div className="row center-md center-xs" style={{marginTop: "50px"}}>
					{ 	!error && !isVerified ?
							<p> Activating your account ... </p>
						: null
					}
					{ 	error ?
			          		<p> An error has occured ... </p>
		        	  	: null
			        }
			        { 	isVerified ? 
			        		<div>
					            <p> Your are a verified user! </p>
					            <p> Redirecting to main page now ... </p>
				           	</div>
				      	: null
			        }
		        </div>
			</div>
		);
	}
}

// redux
function mapStateToProps(state) {
  return {
  	error: state.user.error,
    isVerified: state.user.isAuthenticated,
    user: state.user.userObject
  };
}

const mapDispatchToProps = (dispatch) => {
	return {
		// toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		verifyToken: (token) => {
			dispatch(verifyToken(token));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);