import React from 'react';

import { connect, PromiseState } from 'react-refetch';
import { ROOT_URL } from 'util/api';

import WikiDetail from './WikiDetail';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ wikiFetch, ...rest }) => {
  if (wikiFetch.pending)
    return <Loading />;
  
  if (wikiFetch.rejected)
    return <ErrorComponent error={ wikiFetch.reason } />;
  
  return <WikiDetail sections={ wikiFetch.value.sections } wiki={ wikiFetch.value.wiki } { ...rest } />;
};

Container.propTypes = {
  wikiFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = (props) => {
  const url = `${ ROOT_URL }/wiki/?q=${props.wikiTitle}`;

  return {
    wikiFetch: url,
    refreshWiki: () => ({
      wikiFetch: { url, force: true, refreshing: true },
    }),
  };
};

export default connect(refetch)(Container);