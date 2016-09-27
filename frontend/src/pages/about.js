import React from 'react';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';

import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';

const About = ({ params }) => (
  <div id="about">
    <h1>About Exchange Buddy</h1>
    <p>We are a group of passionate students who have always wished that we could find friends and information for our <strong>Overseas Exchange Programme</strong>. That is why we decided to <strong>group</strong> you with your friends and create <strong>ExchangeBuddy</strong>!</p>
    <p><strong>Exchange Buddy</strong> provides a platform for exchange students to find friends, information and events at the exchange university easily and quickly even before you travel.</p>
    <h1>About The Team</h1>
    <p>The application is developed by four students, <strong>Irvin Lim, Leon Mak, Eugene Ng and Lam Chi Thanh</strong> as a school project for module CS3216 (School of Computing, NUS).</p>
  </div>
);

export default About;
