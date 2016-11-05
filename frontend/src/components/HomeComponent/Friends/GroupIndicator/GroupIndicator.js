import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router'
import Spinner from 'react-spinkit';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import request from 'superagent';
import { bearer } from '../../../../util/bearer';
import { ROOT_URL } from '../../../../util/backend';
import * as UniversityHelper from '../../../../util/university';

const isUserPartOfGroup = (userId, homeFriends) => {
  
  for(var i=0;i<homeFriends.length;i++){

    if(parseInt(homeFriends[i].id)===parseInt(userId)){
      return true;
    }
  }
  return false;
}

export default class GroupIndicator extends React.Component {

  state = {
    noDeleteOpen: false,
    confirmDeleteOpen:false
  };

  handleNoDeleteOpen = () => {
    this.setState({noDeleteOpen: true});
  };

  handleNoDeleteClose = () => {
    this.setState({noDeleteOpen: false});
  };

  handleConfirmDeleteOpen = () =>{
    this.setState({confirmDeleteOpen:true});
  };

  handleConfirmDeleteClose = () =>{
    this.setState({confirmDeleteOpen:false});
  };

  joinGroup(){
    
    const { showSnackbar, clearUser, universities, 
      fetchAllUniversities, userObject, addingGroupSuccessUpdate } = this.props;
    const { homeGroupDetails } = this.props.homeGroupDetails;
    let homeGroupDetailsId = homeGroupDetails.id;

    const req = request
      .post(ROOT_URL + '/joinGroup')
      .send({ 
        GroupId: homeGroupDetails.id
      })
      .use(bearer)
      .end((err,res)=>{
        //console.log(res);
        if (res.status === 401) {
          cookie.remove('authToken');
          this.props.clearUser();
          // need to redirect to a new version of login page
          browserHistory.push('/');
            } 

        if (!err && !res.error && homeGroupDetails.id){
          showSnackbar("Added group!");

          console.log(universities);
          if (universities.length < 2) {
            fetchAllUniversities();
            browserHistory.push(`/home/${homeGroupDetailsId}`)
          }else{
            var newUser = UniversityHelper.insertUniversitiesIntoUser(userObject,universities);
            addingGroupSuccessUpdate(newUser);
          }
          
        } else {
          showSnackbar("Error adding group");
        }
      });

  }

  leaveGroup(){

    const { showSnackbar, clearUser, userObject, leavingGroupSuccessUpdate } = this.props;
    const { homeGroupDetails } = this.props.homeGroupDetails;

    const req = request
      .post(ROOT_URL + '/leaveGroup')
      .send({ 
        GroupId: homeGroupDetails.id
      })
      .use(bearer)
      .end((err,res)=>{
        //console.log(res);
        if (res.status === 401) {
          cookie.remove('authToken');
          this.props.clearUser();
          // need to redirect to a new version of login page
          browserHistory.push('/');
        } 

        if (!err && !res.error && homeGroupDetails.id){
          showSnackbar("Left group!");
          leavingGroupSuccessUpdate(userObject)

        } else {
          showSnackbar("Error leaving group");
        }
      });

  }

  showLeaveDialog(){

    const {homeGroups}=this.props;

    if(homeGroups.length===1){
      this.handleNoDeleteOpen();
    }

    else{
      this.handleConfirmDeleteOpen();
    }

  }

  render(){

    const noDeleteActions = 
    [
      <FlatButton
      label="Back"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.handleNoDeleteClose}
    />
    ];

    const confirmDeleteActions = 
    [
      <FlatButton label="Cancel" primary={true} 
      onTouchTap={this.handleConfirmDeleteClose} />,
      <FlatButton label="Delete" primary={true} 
      onTouchTap={(e)=>{e.preventDefault();this.handleConfirmDeleteClose();this.leaveGroup()}} />,
    ];

    const { homeGroupDetails } = this.props.homeGroupDetails;
    const {userObject} = this.props;

    var userPartOfGroup = isUserPartOfGroup(userObject.id,homeGroupDetails.user);

    return(
      <div>

        <Dialog 
        actions={noDeleteActions} 
        modal={false} 
        open={this.state.noDeleteOpen} 
        onRequestClose={this.handleNoDeleteClose}>
        You cannot delete your last group!
        </Dialog>

        <Dialog
        actions={confirmDeleteActions}
        modal={false}
        open={this.state.confirmDeleteOpen}
        onRequestClose={this.handleConfirmDeleteOpen}>
        Are you sure you want to delete your group?
        </Dialog>
        
        <div className='row middle-xs'>
          {
            (!userPartOfGroup)?
            (
              <div className='col-xs-12'>
                <RaisedButton label='Join group'
                className='join-button'
                primary={true} 
                onTouchTap={(e)=>{e.preventDefault();this.joinGroup()}}/>
                <h3>These students are in this group</h3>
              </div>
            ):
            (
              <div className='col-xs-12'>
              <h3>These students are in the same group as you.</h3>
              <p>Find friends, start chatting, or organize events!</p>
              </div>
            )
          }
        </div>

        <div className='row middle-xs'>
          {
            (userPartOfGroup)?
            (
              <div className='col-xs-12'>
                <RaisedButton label='Leave group'
                className='join-button'
                secondary={true} 
                onTouchTap={(e)=>{e.preventDefault();this.showLeaveDialog()}}/>
              </div>
            ):
            null
          }
        </div>

      </div>
    );
  }
}

GroupIndicator.propTypes = {
  leavingGroupSuccessUpdate: PropTypes.func.isRequired,
  addingGroupSuccessUpdate: PropTypes.func.isRequired,
  fetchAllUniversities: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  userObject: PropTypes.object.isRequired,
  universities: PropTypes.array.isRequired,
  homeGroupDetails: PropTypes.object.isRequired,
  homeGroups: PropTypes.array.isRequired
};