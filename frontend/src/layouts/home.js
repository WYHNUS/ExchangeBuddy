import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, 
  toggleHomeSearchDrawerOpenButtonVisibility,
  toggleTopBarBackButtonVisibility, toggleTopBarVisibility } from '../actions/pageVisibility';
  import {fetchMyGroups, fetchMyGroupsSuccess, fetchMyGroupsFailure,
    fetchCurrentGroup, fetchCurrentGroupSuccess, fetchCurrentGroupFailure,
    toggleSelectedHomeGroup, fetchEvents, fetchEventsSuccess, 
    fetchEventsFailure, resetEvents} from '../actions/home'
    import Header from '../components/Header';
import {browserHistory} from 'react-router';
//import SwitchGroupDialog from '../components/SwitchGroupDialog';

class Home extends React.Component{

  componentDidMount() {
    this.props.toggleBottomBarVisibility(true);
    this.props.toggleTopBarVisibility(true);
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(true);
    this.props.toggleTopBarBackButtonVisibility(true);

    //fetchMyGroups(userId)

    //if user is authenticated, fetch group and point groupDetails to that
    /*if(this.props.user.isAuthenticated){

    }else{

    }*/
    
    this.props.fetchMyGroups(this.props.user.userId);

    //else if user is not authenticated, just fetch selected groupId
    //this.props.fetchCurrentGroup(1);
  }

  componentWillUnmount(){
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(false);
    this.props.toggleTopBarBackButtonVisibility(false);
  }

  render() {
    const{homeGroupsLoaded} = this.props;
    return (
      <div>
      {<Header params={ this.props.params } tab={ this.props.routes[2].path } />}
      <div id="group-container">
      { homeGroupsLoaded?(this.props.children):(<h1>Loading home groups...</h1>) }
      </div>

    {/*<SwitchGroupDialog />*/}
    </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
    toggleHomeSearchDrawerOpenButtonVisibility:visibility=>dispatch
    (toggleHomeSearchDrawerOpenButtonVisibility(visibility)),
    toggleTopBarBackButtonVisibility:visibility=>dispatch
    (toggleTopBarBackButtonVisibility(visibility)),
    fetchMyGroups: (userId) => {
      dispatch(fetchMyGroups(userId)).payload.then((response) => {
        if (!response.error) {
          var selectedIndex = 0;
          dispatch(fetchMyGroupsSuccess(response.data));
          browserHistory.push(`/home/${response.data[0].id}`)
          dispatch(toggleSelectedHomeGroup(selectedIndex))
          dispatch(fetchEvents(response.data[selectedIndex].id)).payload.then((response) => {
            if (!response.error) {
              dispatch(fetchEventsSuccess(response.data));
            } else {
              dispatch(fetchEventsFailure(response.error));
            }
          });
          dispatch(fetchCurrentGroup(response.data[selectedIndex].id)).payload.then((response) => {
            if (!response.error) {
              dispatch(fetchCurrentGroupSuccess(response.data));
            } else {
              dispatch(fetchCurrentGroupFailure(response.error));
            }
          });
        } else {
          dispatch(fetchMyGroupsFailure(response.error));
        }
      });
    }
  };
};

const mapStateToProps = (state)=>{
  return {
    user:state.user.userObject,
    homeGroupsLoaded: state.home.homeGroups.groupsLoaded
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);