import React from 'react';
import { browserHistory } from 'react-router';

import Icon from 'components/Icon';

import * as Colors from 'material-ui/styles/colors';

import './AdminDashboardButton.scss';

const AdminDashboardButton = ({ icon, label, description, link }) => (
  <div className="admin-dashboard-button" onClick={ () => browserHistory.push(link) }>
    <Icon name={ icon } size={60} color={ Colors.grey500 } />
    <h2>{ label }</h2>
    <p>{ description }</p>
  </div>
);

AdminDashboardButton.propTypes = {
  icon: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  link: React.PropTypes.string.isRequired,
};

export default AdminDashboardButton;