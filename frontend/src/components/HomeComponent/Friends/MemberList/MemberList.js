import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router'
import Spinner from 'react-spinkit';
import RaisedButton from 'material-ui/RaisedButton';

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

  render(){

    const { homeFriends, loading, error } = this.props.homeFriends;
    const {user} = this.props;

    var userPartOfGroup = isUserPartOfGroup(user.id,homeFriends);

    if(loading) {
      return <Spinner spinnerName="circle" />      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return(
      <div>
        
        <div className='row middle-xs'>
          {
            (!userPartOfGroup)?
            (
              <div>
              <div className='col-xs-12'>
                <RaisedButton label='Add group' onTouchTap={(e)=>{e.preventDefault();alert('hello')}}/>
              </div>
              <div className='col-xs-12'>
              <h3>These students are in this group</h3>
              </div>
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
            { homeFriends.map((user, idx) => <MemberTile key={ idx } user={ user } />) }
          </div>
        </div>

      </div>
    );
  }
}

// style={{ textAlign: 'center' }}