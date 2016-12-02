import React, {PropTypes} from 'react';
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import cookie from 'react-cookie';
import request from 'superagent';
import { bearer } from '../../../../util/bearer';
import { ROOT_URL } from '../../../../util/backend';
import * as UniversityHelper from '../../../../util/university';
import * as GroupHelper from '../../../../util/group';
import {fetchAllUniversities } from '../../../../actions/utilityInfo';

export default class GroupButtons extends React.Component {

  state = {
    noDeleteOpen: false,
    confirmDeleteOpen:false
  };

  render() {
    const noDeleteActions = 
    [
      <FlatButton
      label="Back"
      primary
      keyboardFocused
      onTouchTap={this.handleNoDeleteClose}
    />
    ];

    const confirmDeleteActions = 
    [
      <FlatButton label="Cancel" primary 
      onTouchTap={this.handleConfirmDeleteClose} />,
      <FlatButton label="Delete" primary 
      onTouchTap={(e)=>{e.preventDefault();this.handleConfirmDeleteClose();this.leaveGroup()}} />,
    ];

    const { homeGroupDetails } = this.props.homeGroupDetails;
    const {userObject} = this.props;

    var userPartOfGroup = GroupHelper.isUserPartOfGroup(userObject.id,homeGroupDetails.user);

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
        
        <div className="row middle-xs">
          {
            (!userPartOfGroup)?
            (
              <div className="col-xs-12">
                <RaisedButton label="Join group"
                className="join-button"
                primary 
                onTouchTap={(e)=>{e.preventDefault();this.joinGroup()}}/>
                </div>
            ):
            (
              <div className="col-xs-12">
                <RaisedButton label="Leave group"
                className="join-button"
                secondary 
                onTouchTap={(e)=>{e.preventDefault();this.showLeaveDialog()}}/>
              </div>
            )
          }
        </div>

      </div>
    );
  }

  handleNoDeleteOpen = () => {
    this.setState({ noDeleteOpen: true });
  };

  handleNoDeleteClose = () => {
    this.setState({ noDeleteOpen: false });
  };

  handleConfirmDeleteOpen = () =>{
    this.setState({ confirmDeleteOpen: true });
  };

  handleConfirmDeleteClose = () =>{
    this.setState({ confirmDeleteOpen: false });
  };

  joinGroup(){
    
    const { showSnackbar, clearUser, universities, fetchAllUniversitiesFailure,
      fetchAllUniversitiesSuccess, userObject, addingGroupSuccessUpdate } = this.props;
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
          showSnackbar('Added group!');

          if (universities.length < 2) {
            
            fetchAllUniversities().payload.then((response) =>{
              
              if(!response.error){
                fetchAllUniversitiesSuccess(response.data);
                var newUser = UniversityHelper.insertUniversitiesIntoUser(userObject,universities);
                addingGroupSuccessUpdate(newUser);    
              }

              else{
                fetchAllUniversitiesFailure(response.error);
                showSnackbar('Error adding group');
              }
              
            });

          }else{
            var newUser = UniversityHelper.insertUniversitiesIntoUser(userObject,universities);
            addingGroupSuccessUpdate(newUser);
          }
          
        } else {
          showSnackbar('Error adding group');
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
          showSnackbar('Left group!');
          leavingGroupSuccessUpdate(userObject)

        } else {
          showSnackbar('Error leaving group');
        }
      });

  }

  showLeaveDialog() {
    const { homeGroups } = this.props;

    if (homeGroups.length === 1) {
      this.handleNoDeleteOpen();
    } else {
      this.handleConfirmDeleteOpen();
    }
  }
}

GroupButtons.propTypes = {
  leavingGroupSuccessUpdate: PropTypes.func.isRequired,
  addingGroupSuccessUpdate: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  userObject: PropTypes.object.isRequired,
  universities: PropTypes.array.isRequired,
  homeGroupDetails: PropTypes.object.isRequired,
  homeGroups: PropTypes.array.isRequired,
  fetchAllUniversitiesSuccess: PropTypes.func.isRequired,
  fetchAllUniversitiesFailure: PropTypes.func.isRequired
};