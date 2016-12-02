import React from 'react';
import { connect } from 'react-redux';

import MemberList from '../../components/HomeComponent/Friends/MemberList';
import GroupIndicator from '../../components/HomeComponent/Friends/GroupIndicator';
import GroupButtons from '../../components/HomeComponent/Friends/GroupButtons';
import FBButtons from '../../components/HomeComponent/Friends/FBButtons';
import {toggleHomeTab} from '../../actions/home'

import Spinner from 'react-spinkit';


class Friends extends React.Component{

  componentWillMount(){
    this.props.toggleHomeTab('friends');
  }

  render(){

    const { loading, error } = this.props.homeGroupDetails;


      if(loading) {
        return <Spinner spinnerName="circle" />      
      } else if(error) {
        return <div className="alert alert-danger">Error: {error.message}</div>
      }

    return(

    <div className="friends-container">
    <GroupIndicator/>
    <MemberList />
    <FBButtons/>
    <GroupButtons/>
    </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHomeTab:(tab)=>dispatch(toggleHomeTab(tab))
  };
};

const mapStateToProps = (state)=>{
  return {
    homeGroupDetails: state.home.homeGroupDetails,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);