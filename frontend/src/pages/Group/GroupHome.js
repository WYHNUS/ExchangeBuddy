import React from 'react';

import GroupHome from 'components/Group/GroupHome';

const Page = ({ params }) => (
  <GroupHome groupId={ parseInt(params.id) } />
);

Page.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Page;