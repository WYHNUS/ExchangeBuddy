import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import SubmitForm from '../../components/Group/Chat/SubmitForm';
import MessageList from '../../components/Group/Chat/MessageList';

const GroupChat = ({ params }) => (
  <Grid>
    <div className="chat-container">
      <MessageList groupId={ parseInt(params.id) } />
      <SubmitForm groupId={ parseInt(params.id) } />
    </div>
  </Grid>
);

export default GroupChat;
