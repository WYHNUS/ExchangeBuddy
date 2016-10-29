import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import SignupForm from '../components/SignupForm';
import ExchangeBuddySpreadIcon from '../res/ExchangeBuddySpreadIcon.png';

class Signup extends React.Component {
  render() {
    return(
      <div className="page-sign-flow">
        <div className="hide-text"></div>
        <div className="sign-flow-nav-tab">
          <RaisedButton
            primary={true}
            label="Signup"
            className="sign-flow-nav-button disabled" />
          <RaisedButton
            label="Login"
            onTouchTap={ () => browserHistory.push('/login')}
            className="sign-flow-nav-button enabled" />
        </div>

        <div className="signup-form">
          <SignupForm/>
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
    actions: bindActionCreators({  }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);