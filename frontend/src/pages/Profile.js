import React from 'react';
import Profile from 'components/Profile';

const Page = ({ params }) => (
  <Profile userId={ parseInt(params.id) } />
);

Page.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }).isRequired,
};

export default Page;