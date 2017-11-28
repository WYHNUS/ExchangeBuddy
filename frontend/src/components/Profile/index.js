import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { makeRefetch } from 'util/api';

import Profile from './Profile';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

import { redirect } from 'util/links';
import { userTransform } from 'util/propTypes';

const Container = ({ userFetch, ...rest }) => {
  if (userFetch.pending)
    return <Loading />;
  
  if (userFetch.rejected)
    return <ErrorComponent error={ userFetch.reason } />;

  const user = userFetch.value;
  
  return <Profile user={ user } { ...rest } />;
};

Container.propTypes = {
  userFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = ({ currentUser, userId }) => {
  let userFetch;

  if (userId) {
    userFetch = makeRefetch(`/user/${ userId }`, { userToken: true }, userTransform);
  } else if (currentUser) {
    userFetch = makeRefetch(`/user/${ currentUser.id }`, { userToken: true }, userTransform);
  } else {
    redirect();
  }

  return {
    userFetch,
    refreshProfile: () => ({
      userFetch: { ...userFetch, force: true, refreshing: true },
    }),
  };
};

const RefetchedComponent = connect(refetch)(Container);

// Redux
import { connect as reduxConnect } from 'react-redux';

const mapStateToProps = (state) => ({
  currentUser: state['User/currentUser'],
});

export default reduxConnect(mapStateToProps)(RefetchedComponent);