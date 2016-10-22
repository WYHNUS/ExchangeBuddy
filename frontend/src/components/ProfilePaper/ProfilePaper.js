import React, {PropTypes} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Link from '../Link';

import * as UserHelper from '../../util/user';

const text_header_style = {
  fontSize: "-webkit-xxx-large",
  fontWeight: 300,
};

export default class ProfilePaper extends React.Component {

  componentWillMount(){
    this.props.fetchProfile(1);
  }

  render() {
    const { user, userExchangeUniversities, userHomeUniversity } = this.props;

    return (
        <Grid>
          <Row id="profile-paper">
            <Col xs={12} md={3} id="user-image">
              { UserHelper.getAvatar(user, 300, { height: "auto", width: "100%" }) }
            </Col>

            <Col xs={12} md={7} id="user-info">
              <h1 style={ text_header_style }>{ user.displayName }</h1>

              <div className="flex-table-container">

                  <Row>
                    <Col xs={12} sm={4} className="table-header">Home University</Col>
                    <Col xs={12} sm={8} className="table-cell">
                      { userHomeUniversity.name }
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={4} className="table-header">On exchange to</Col>
                    <Col xs={12} sm={8} className="table-cell">
                      { userExchangeUniversities.map((uni, idx) => {<p key={idx}>{ uni.name }</p>}) }
                      { /*userExchangeUniversities.name*/ }
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} sm={4} className="table-header">Facebook</Col>
                    <Col xs={12} sm={8} className="table-cell">
                      <Link to={ `https://facebook.com/${user.fbUserId}` }>Facebook profile</Link>
                    </Col>
                  </Row>

              </div>
            </Col>
          </Row>
        </Grid>
    )
  }
}

ProfilePaper.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired
};

