import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { EmailFormField } from '../components/Field';
import ExchangeBuddySpreadIcon from '../res/ExchangeBuddySpreadIcon.png';

class Signin extends React.Component { 
  submitForm (val) {
    console.log(val);
    // this.props.submitSignupForm(this.props.allSignupInfo, val);
  }
  
	render() {
		return(
		  <div className="page-sign-flow">
		  	<div className="hide-text"></div>
		  	<div className="sign-flow-nav-tab">
		  		<RaisedButton
	          label="Signup"
	          onTouchTap={ () => browserHistory.push('/signup')}
            className="sign-flow-nav-button enabled" />
		  		<RaisedButton
            primary={true}
	          label="Signin"
            className="sign-flow-nav-button disabled" />
		  	</div>

        <div className="signin-form">
          
        </div>
		  </div>
		);
	}
}


     /*       
    <form onSubmit={ handleSubmit((values) => {
            this.submitForm(values)
          }) }>

          </form>
     <EmailFormField
              name="homeUniEmail"
              floatingLabelText="Your email address" />
            <div style={{ marginTop: 12 }}>
              <NextButton label="Send verification email" disabled={submitting} />
            </div>
          { submitting ? <p>Registering user. Please be patient. :)</p> : null }

          { 
            this.props.isEmailSent ? 
            <div> 
              <p>Verification email sent! Check your mail to start connecting with people!</p> 
              <p>Redirecting to the main page ... </p>
            </div> 
            : null 
          }
*/

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = (state)=>{
  return{
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);