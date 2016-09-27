import React from 'react';
import * as ImagesHelper from '../../util/images';
import * as IconsHelper from '../../util/icons';
import { Grid, Row, Col } from 'meteor/lifefilm:react-flexbox-grid';
import {Tabs, Tab} from 'material-ui/Tabs';

import ProfilePaper from '../components/ProfilePaper';
import NavigationBar from '../components/NavigationBar/NavigationBar.js';

const Profile = ({ params }) => (
  <ProfilePaper userId={ params.userId } />
);

export default Profile;
