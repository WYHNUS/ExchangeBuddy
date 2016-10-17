import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, 
  toggleHomeSearchDrawerOpenButtonVisibility,
  toggleTopBarBackButtonVisibility } from '../actions/pageVisibility';
import {fetchMyGroups, fetchMyGroupsSuccess, fetchMyGroupsFailure,
fetchCurrentGroup, fetchCurrentGroupSuccess, fetchCurrentGroupFailure} from '../actions/home'
import Header from '../components/Header';
//import SwitchGroupDialog from '../components/SwitchGroupDialog';

class Home extends React.Component{

  componentDidMount() {
    this.props.toggleBottomBarVisibility(true);
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(true);
    this.props.toggleTopBarBackButtonVisibility(true);

    //fetchMyGroups(userId)
    this.props.fetchMyGroups(this.props.userId);
    //console.log(this.props.params);
    //console.log(this.props.routes[1]);
  }

  componentWillUnmount(){
    this.props.toggleHomeSearchDrawerOpenButtonVisibility(false);
    this.props.toggleTopBarBackButtonVisibility(false);
  }

  render() {
    return (
      <div>
    {<Header params={ this.props.params } tab={ this.props.routes[2].path } />}
    <div id="group-container">
    { this.props.children }
    </div>

  {/*<SwitchGroupDialog />*/}
  </div>
  );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleHomeSearchDrawerOpenButtonVisibility:visibility=>dispatch
    (toggleHomeSearchDrawerOpenButtonVisibility(visibility)),
    toggleTopBarBackButtonVisibility:visibility=>dispatch
    (toggleTopBarBackButtonVisibility(visibility)),
    fetchMyGroups: (userId) => {
      dispatch(fetchMyGroups(userId)).payload.then((response) => {
        if (!response.error) {
          dispatch(fetchMyGroupsSuccess(response.data));
        } else {
          dispatch(fetchMyGroupsFailure(response.error));
        }
      });
    },
    fetchCurrentGroup: (id) => {
      dispatch(fetchCurrentGroup(id)).payload.then((response) => {
        if (!response.error) {
          dispatch(fetchCurrentGroupSuccess(response.data));
        } else {
          dispatch(fetchCurrentGroupFailure(response.error));
        }
      });
    }
  };
};

const mapStateToProps = (state)=>{
  return {
    userId:state.user.userObject.userId
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);