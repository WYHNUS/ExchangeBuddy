import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router'

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

const MemberTile = ({ user }) => (
  <Col xs={12} sm={6} md={4}>
    <ListItem primaryText={ user.displayName }
      secondaryText={ user.homeUniversity.name }
      leftAvatar={ getAvatar(user, 40) }
      onTouchTap={ gotoProfile(user.id) }
    />
  </Col>
);

const MemberList = ({ groupUsers }) => (
  <Grid>
    <Row>

      { groupUsers.map((user, idx) => <MemberTile key={ idx } user={ user } />) }

    </Row>
  </Grid>
)

export default MemberList;
