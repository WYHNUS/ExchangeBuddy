import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { makeRefetch } from 'util/api';
import { feedPostTransform } from 'util/propTypes';

import GroupFeed from './GroupFeed';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ groupFeedFetch, ...rest }) => {
  if (groupFeedFetch.pending)
    return <Loading />;
  
  if (groupFeedFetch.rejected)
    return <ErrorComponent error={ groupFeedFetch.reason } />;
  
  return <GroupFeed feedPosts={ groupFeedFetch.value } { ...rest } />;
};

Container.propTypes = {
  groupFeedFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = ({ group }) => {
  const groupFeedFetch = makeRefetch(`/feedpost/${ group.id }`, { userToken: true }, ({ feedposts }) => feedposts.map(feedPostTransform));

  return {
    groupFeedFetch,
    refreshGroupFeed: () => ({
      groupFeedFetch: { ...groupFeedFetch, force: true, refreshing: true },
    }),
  };
};

export default connect(refetch)(Container);