import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { ROOT_URL } from 'util/api';

import AdminUniversities from './AdminUniversities';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ countriesFetch, ...rest }) => {
  if (countriesFetch.pending)
    return <Loading />;
  
  if (countriesFetch.rejected)
    return <ErrorComponent error={ countriesFetch.reason } />;
  
  const countries = countriesFetch.value;

  return <AdminUniversities countries={ countries } { ...rest } />;
};

Container.propTypes = {
  countriesFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = () => ({
  countriesFetch: `${ ROOT_URL }/country`,
});

export default connect(refetch)(Container);