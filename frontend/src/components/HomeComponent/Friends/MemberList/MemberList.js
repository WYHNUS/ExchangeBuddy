import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router'
import Spinner from 'react-spinkit';

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

    if(loading) {
      return <Spinner spinnerName="circle" />      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return(
      <div className='row start-xs'>
        <div className='col-xs-12'>
          <h3 style={{ textAlign: 'center' }}>These students are in the same group as you.</h3>
          { homeFriends.map((user, idx) => <MemberTile key={ idx } user={ user } />) }
        </div>
      </div>
    );
  }
}
