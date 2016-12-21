import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { makeRefetch } from 'util/api';

import Profile from './Profile';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

// TEMP
const _tempAdditionalUserFields = {
  university: { 
    id: 1, 
    name: 'National University of Singapore', 
    city: 'Singapore', 
    logoImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/national-university-of-singapore-nus.jpg',
    country: {
      alpha2Code: 'SG',
      name: 'Singapore',
    },
  },
  homeCountry: {
    alpha2Code: 'SG',
    name: 'Singapore',
  },
  exchanges: [
    {
      month: 7, 
      year: 2017,
      university: {
        id: 2,
        name: 'Fudan University',
        city: 'Shanghai',
        logoImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/fudan-university.jpg',
        country: {
          alpha2Code: 'CN',
          name: 'China',
        },
      },
    },
  ],
};

const Container = ({ userFetch, ...rest }) => {
  if (userFetch.pending)
    return <Loading />;
  
  if (userFetch.rejected)
    return <ErrorComponent error={ userFetch.reason } />;
  
  return <Profile user={ { ...userFetch.value, ..._tempAdditionalUserFields } } { ...rest } />;
};

Container.propTypes = {
  userFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = ({ userId }) => {
  let userFetch;

  if (userId) {
    userFetch = makeRefetch(`/user/${ userId }`, { userToken: true });
  } else {
    userFetch = makeRefetch(`/me`, { userToken: true });
  }

  return {
    userFetch,
    refreshProfile: () => ({
      userFetch: { ...userFetch, force: true, refreshing: true },
    }),
  };
};

export default connect(refetch)(Container);