import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { ROOT_URL } from 'util/api';

import AdminUniversitiesList from './AdminUniversitiesList';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ universitiesFetch, ...rest }) => {
  if (universitiesFetch.pending)
    return <Loading />;
  
  if (universitiesFetch.rejected)
    return <ErrorComponent error={ universitiesFetch.reason } />;
  
  const universities = universitiesFetch.value;

  return <AdminUniversitiesList universities={ universities } { ...rest } />;
};

Container.propTypes = {
  universitiesFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = (props) => {
  const url = `${ ROOT_URL }/universitiesByCountry/${ props.countryCode }`;

  return {
    universitiesFetch: url,
    refreshUniversities: () => ({
      universitiesFetch: { url, force: true, refreshing: true },
    })
  };
};

export default connect(refetch)(Container);