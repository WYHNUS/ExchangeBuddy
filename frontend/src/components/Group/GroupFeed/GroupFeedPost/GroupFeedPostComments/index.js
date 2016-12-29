import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { makeRefetch } from 'util/api';
import { feedPostCommentTransform } from 'util/propTypes';

import GroupFeedPostComments from './GroupFeedPostComments';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ commentsFetch, ...rest }) => {
  if (commentsFetch.pending)
    return <Loading />;
  
  if (commentsFetch.rejected)
    return <ErrorComponent error={ commentsFetch.reason } />;
  
  return <GroupFeedPostComments feedComments={ commentsFetch.value } { ...rest } />;
};

Container.propTypes = {
  commentsFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = ({ feedPost }) => {
  const commentsFetch = makeRefetch(`/feedpostComment/${ feedPost.id }`, { userToken: true }, ({ data }) => data.map(feedPostCommentTransform));

  return {
    commentsFetch,
    refreshComments: () => ({
      commentsFetch: { ...commentsFetch, force: true, refreshing: true },
    }),
  };
};

export default connect(refetch)(Container);