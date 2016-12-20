/*
== Temp for backend API

import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { makeRefetch } from 'util/api';

import GroupHome from './GroupHome';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ groupFetch, ...rest }) => {
  if (groupFetch.pending)
    return <Loading />;
  
  if (groupFetch.rejected)
    return <ErrorComponent error={ groupFetch.reason } />;
  
  return <GroupHome group={ groupFetch.value } { ...rest } />;
};

Container.propTypes = {
  groupFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = ({ groupId }) => {
  const groupFetch = makeRefetch(`/group/${ groupId }`, { userToken: true });

  return {
    groupFetch,
    refreshGroup: () => ({
      groupFetch: { ...groupFetch, force: true, refreshing: true },
    }),
  };
};

export default connect(refetch)(Container);*/

import { connect } from 'react-redux';
import ChildComponent from './GroupHome';

const _tempGroup = {
  id: 1,
  university: {
    id: 12,
    name: 'Technical University of Munich',
    city: 'Munich',
    logoImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/technical-university-of-munich.jpg',
    country: {
      alpha2Code: 'DE',
      name: 'Germany',
    },
  },
  month: 7,
  year: 2017,
  users: [
    { 
      id: 1, 
      name: 'Irvin Lim Wei Quan', 
      fbUserId: '10155216317967575',
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
    },
    {
      id: 2,
      name: 'Nancy Parker',
      profilePictureUrl: 'http://lorempixel.com/80/80/people',
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
    {
      id: 3,
      name: 'Margeret Pearson',
      profilePictureUrl: 'http://lorempixel.com/80/80/people/2',
      university: {
        id: 3,
        name: 'Stanford University',
        city: 'Palo Alto',
        logoImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/exchangebuddy-university-public-image/stanford-university.jpg',
        country: {
          alpha2Code: 'US',
          name: 'United States of America (USA)',
        }
      },
    },
  ],
};

const mapStateToProps = () => ({
  group: _tempGroup,
});

export default connect(mapStateToProps)(ChildComponent);