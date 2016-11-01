import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import LoginForm from '../components/LoginForm';
import ExchangeBuddySpreadIcon from '../res/ExchangeBuddySpreadIcon.png';

class Login extends React.Component { 
	render() {
		return(
		  <div className="page-sign-flow">
		  	<div className="hide-text"></div>
		  	<div className="sign-flow-nav-tab">
	  		<FlatButton
	          label="Signup"
	          onTouchTap={ () => browserHistory.push('/signup')}
              className="sign-flow-nav-button" />
	  		<FlatButton
	          primary={true}
	          label="Login"
              className="sign-flow-nav-button" />
		  	</div>

        <div className="signin-form">
          <LoginForm/>
        </div>
		  </div>
		);
	}
}

const mapStateToProps = (state)=>{
  return {
    user: state.user.userObject
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);