import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import Spinner from 'react-spinkit';

import {
  fetchMyGroups, fetchMyGroupsSuccess, fetchMyGroupsFailure,
  fetchCurrentGroup, fetchCurrentGroupSuccess, fetchCurrentGroupFailure,
  toggleSelectedHomeGroup, resetEvents
} from 'actions/home';

import { clearUser } from 'actions/authActions';

import BottomBar from 'components/BottomBar';
import TopBar from 'components/TopBar';
import Header from 'components/Header';

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchMyGroups(this.props.user.id);
  }

  render() {
    const { homeGroupsLoaded } = this.props;

    return (
      <div className="app-container">
        <TopBar showSettingsButton showHomeSearchDrawerOpenButton onTouchTap={ () => this.props.toggleHomeSearchDrawerVisibility(false) } />

        <div className="home-wrapper container panel">
          <Header params={ this.props.params } tab={ this.props.routes[2].path } />
          <div className="home-content-wrapper">
            { homeGroupsLoaded?(this.props.children):(<Spinner spinnerName="circle" />) }
          </div>
        </div>

        <BottomBar />
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMyGroups: (userId) => {
      dispatch(fetchMyGroups(userId)).payload.then((response) => {
        if (!response.error) {
          var selectedIndex = 0;
          dispatch(fetchMyGroupsSuccess(response.body));
          browserHistory.push(`/home/${response.body[0].id}`)
          dispatch(toggleSelectedHomeGroup(selectedIndex))
          dispatch(fetchCurrentGroup(response.body[selectedIndex].id)).payload.then((response) => {
            if (!response.error) {
              dispatch(fetchCurrentGroupSuccess(response.body));
            } else {
              dispatch(fetchCurrentGroupFailure(response.error));
            }
          }, (err) => {
            if (err.status === 401) {
              cookie.remove('authToken');
              dispatch(clearUser());
              // need to redirect to a new version of login page
              browserHistory.push('/');
            } else {
              dispatch(fetchCurrentGroupFailure(err.response.error.message));
            }
          });
        } else {
          dispatch(fetchMyGroupsFailure(response.error));
        }
      }, (err) => {
        if (err.status === 401) {
          cookie.remove('authToken');
          dispatch(clearUser());
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } else {
          dispatch(fetchMyGroupsFailure(err.response.error.message));
        }
      });
    },
  };
};

const mapStateToProps = (state)=>{
  return {
    user:state.user.userObject,
    homeGroupsLoaded: state.home.homeGroups.groupsLoaded,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);