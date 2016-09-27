import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import InfoViewEdit from '../../components/Group/Info/InfoViewEdit';

const EditInfo = ({ params }) => (
  <div className="info-container">
    <Grid>
      <Row>
        <Col xs={12} style={{ marginBottom: 21 }}>
          <InfoViewEdit about={ params.about } sectionId={ parseInt(params.sectionId) } groupId={ parseInt(params.id) } />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default EditInfo;
