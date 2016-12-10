import React from 'react';
import { browserHistory } from 'react-router';

class Verify extends React.Component{
  componentDidMount() {
    this.props.verifyToken(this.props.routeParams.token);
  }

  componentDidUpdate() {
    if (this.props.isVerified) {
      setTimeout(function() {
        browserHistory.push('/home');
      }, 2000);
    }
  }

  render() {
    const { error, isVerified } = this.props; 

    return (
      <div className="row center-md center-xs" style={{ marginTop: 50 }}>
        { error 
          ? <p>An error has occured...</p>
          : isVerified 
            ?  <div>
                <p>Your are already verified!</p>
                <p>Redirecting back to home...</p>
              </div>
            : <p>Activating your account...</p>
        }
      </div>
    );
  }
}

// Redux
import { connect } from 'react-redux';
import { verifyToken, verifyTokenSuccess, verifyTokenFail } from 'actions/authActions';

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    isVerified: state.user.isAuthenticated,
    user: state.user.userObject
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: (token) => {
      dispatch(verifyToken(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verify);