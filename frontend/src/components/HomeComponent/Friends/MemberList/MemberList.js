import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router'
import Spinner from 'react-spinkit';
import RaisedButton from 'material-ui/RaisedButton';

import request from 'superagent';
import { bearer } from '../../../../util/bearer';
import { ROOT_URL } from '../../../../util/backend';

import { getAvatar } from '../../../../util/user';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  gridList: {
    width: "100%",
    margin: "0 auto",
  },
};

const gotoProfile = (userId) => () => {
  browserHistory.push(`/profile/${userId}`);
}

const isUserPartOfGroup = (userId, homeFriends) => {
  
  for(var i=0;i<homeFriends.length;i++){

    if(parseInt(homeFriends[i].id)===parseInt(userId)){
      return true;
    }
  }
  return false;
}

export const MemberTile = ({ user }) => (
  <Col xs={12} sm={6} md={4}>
    <ListItem primaryText={ user.name }
    secondaryText={ user.University.name }
    leftAvatar={ getAvatar(user, 40) }
    onTouchTap={ gotoProfile(user.id) }
    />
  </Col>
);

export default class MemberList extends React.Component {

  joinGroup(){
    
    const { showSnackbar, clearUser } = this.props;
    const { homeGroupDetails } = this.props.homeGroupDetails;

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
          addingGroupSuccessUpdate(userObject);

        } else {
          showSnackbar("Error adding group");
        }
      });

  }

  leaveGroup(){

    const { showSnackbar, clearUser } = this.props;
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
          //addingGroupSuccessUpdate(homeGroupDetails, userObject)

        } else {
          showSnackbar("Error leaving group");
        }
      });

  }

  showConfirmLeaveDialog(){


  }

  showNoLeaveDialog(){


  }

  render(){

    const { loading, error, homeGroupDetails } = this.props.homeGroupDetails;
    const {user} = this.props;

    if(loading) {
      return <Spinner spinnerName="circle" />      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    var userPartOfGroup = isUserPartOfGroup(user.id,homeGroupDetails.user);

    return(
      <div>
        
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

        <div className='row start-xs'>
          <div className='col-xs-12'>
            { homeGroupDetails.user.map((user, idx) => <MemberTile key={ idx } user={ user } />) }
          </div>
        </div>

        <div className='row middle-xs'>
          {
            (userPartOfGroup)?
            (
              <div className='col-xs-12'>
                <RaisedButton label='Leave group'
                className='join-button'
                secondary={true} 
                onTouchTap={(e)=>{e.preventDefault();this.leaveGroup()}}/>
              </div>
            ):
            null
          }
        </div>

      </div>
    );
  }
}

// style={{ textAlign: 'center' }}