import React from 'react';

import GroupHome from 'components/Group/GroupHome';

const Page = ({ params }) => (
  <div className="group-home container">
    <GroupHome groupId={ parseInt(params.id) } />
  </div>
);

Page.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Page;