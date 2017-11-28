import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { makeRefetch } from 'util/api';

import WikiRecommendationList from './WikiRecommendationList';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ recommendedWikisFetch, ...rest }) => {
  if (recommendedWikisFetch.pending)
    return <Loading />;
  
  if (recommendedWikisFetch.rejected)
    return <ErrorComponent error={ recommendedWikisFetch.reason } />;
  
  return <WikiRecommendationList recommendedWikis={ recommendedWikisFetch.value.wiki } { ...rest } />;
};

Container.propTypes = {
  recommendedWikisFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = () => {
  const recommendedWikisFetch = makeRefetch('/wikiCustomizedRecommend', { userToken: true });

  return {
    recommendedWikisFetch,
    refreshWikis: () => ({
      recommendedWikisFetch: { ...recommendedWikisFetch, force: true, refreshing: true },
    }),
  };
};

export default connect(refetch)(Container);