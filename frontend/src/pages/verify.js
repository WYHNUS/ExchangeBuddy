import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

// Action creators
import { verifyToken, verifyTokenSuccess, verifyTokenFail } from '../actions/authActions';


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
      <div>
            <div className="row center-md center-xs" style={{ marginTop: 50 }}>
          {   !error && !isVerified ?
              <p> Activating your account ... </p>
            : null
          }
          {   error ?
                    <p> An error has occured ... </p>
                  : null
              }
              {   isVerified ? 
                  <div>
                      <p> Your are a verified user! </p>
                <p> Redirecting to the home page ...  </p>
                    </div>
                : null
              }
            </div>
      </div>
    );
  }
}

// redux
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