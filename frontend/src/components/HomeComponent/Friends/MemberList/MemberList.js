import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router'

import { getAvatar } from '../../../../util/user';

/*{
  "id": 1,
  "name": "a students in a",
  "user": [
    {
      "id": 5,
      "name": "Lee Kai Yi",
      "profilePictureUrl": null,
      "University": {
        "name": "a",
        "id": 3
      },
      "chat_group": {
        "createdAt": "2016-10-17T17:00:11.000Z",
        "updatedAt": "2016-10-17T17:00:11.000Z",
        "groupId": 1,
        "userId": 5
      }
    }
  ],
  "ChatMessages": []
}*/

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
  leftAvatar={ getAvatar(user.profilePictureUrl, 40) }
  onTouchTap={ gotoProfile(user.id) }
  />
  </Col>
  );

export default class MemberList extends React.Component {

  render(){

    const { homeFriends, loading, error } = this.props.homeFriends;

    if(loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>      
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return(
      <Grid>
      <Row>
      { homeFriends.map((user, idx) => <MemberTile key={ idx } user={ user } />) }
      </Row>
      </Grid>

      );
  }
}
