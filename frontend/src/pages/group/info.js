import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import InfoGridList from '../../components/Group/Info/InfoGridList';

const GroupInfo = ({ params }) => (
  <Grid>
    <Row>
      <Col xs={12} style={{ marginTop: 15 }}>
        <InfoGridList about="university" groupId={ parseInt(params.id) } />
      </Col>

      <Col xs={12} style={{ marginTop: 15 }}>
        <InfoGridList about="country" groupId={ parseInt(params.id) } />
      </Col>
    </Row>
  </Grid>
);

export default GroupInfo;
