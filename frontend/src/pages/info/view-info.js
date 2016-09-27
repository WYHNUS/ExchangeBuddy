import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import InfoView from '../../components/Group/Info/InfoView';

const ViewInfo = ({ params }) => (
  <div className="info-container">
    <Grid>
      <Row>
        <Col xs={12} >
          <InfoView about={ params.about } sectionId={ parseInt(params.sectionId) } groupId={ parseInt(params.id) } />
        </Col>
      </Row>
    </Grid>
  </div>
)

export default ViewInfo;
