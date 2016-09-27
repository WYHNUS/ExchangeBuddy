import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import EventList from '../../components/Group/Events/EventList';

const GroupEvents = ({ params }) => (
  <Grid>
    <Row>
      <Col xs={12} md={6}>
        <h3 className="event-title pinline"> <span>Facebook Events</span> </h3>
        <EventList source="Facebook" groupId={ params.id } />
      </Col>
      <Col xs={12} md={6}>
        <h3 className="event-title pinline"> <span>Meetup Events</span> </h3>
        <EventList source="Meetup" groupId={ params.id } />
      </Col>
    </Row>
  </Grid>
);

export default GroupEvents;
