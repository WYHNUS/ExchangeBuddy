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
  },
  month: 7,
  year: 2017,
};

const mapStateToProps = () => ({
  group: _tempGroup,
});

export default connect(mapStateToProps)(ChildComponent);