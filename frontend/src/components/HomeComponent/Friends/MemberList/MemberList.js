import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';

import request from 'superagent';
import { bearer } from 'util/bearer';
import { ROOT_URL } from 'util/backend';
import * as UniversityHelper from 'util/university';

import { getAvatar } from 'util/user';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  gridList: {
    width: '100%',
    margin: '0 auto',
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

    const { homeGroupDetails } = this.props.homeGroupDetails;

    return(
      <div>

        <div className="row start-xs">
          <div className="col-xs-12">
            { homeGroupDetails.user.map((user, idx) => <MemberTile key={ idx } user={ user } />) }
          </div>
        </div>

      </div>
    );
  }
}

MemberList.propTypes = {
  homeGroupDetails: PropTypes.object.isRequired
};