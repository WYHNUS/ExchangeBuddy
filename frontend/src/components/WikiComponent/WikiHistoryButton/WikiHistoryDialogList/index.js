import React from 'react';
import { connect, PromiseState } from 'react-refetch';
import { ROOT_URL } from 'util/backend';

import WikiHistoryDialogList from './WikiHistoryDialogList';
import Loading from 'components/Loading';
import ErrorComponent from 'components/Error';

const Container = ({ versionsFetch }) => {
  if (versionsFetch.pending)
    return <Loading />;
  
  if (versionsFetch.rejected)
    return <ErrorComponent error={ versionsFetch.reason } />;
  
  const { versions } = versionsFetch.value;

  // Can simply use reverse if we can ensure that that it returns in sorted order.
  const sortedVersions = versions.sort((a, b) => a.versionNumber < b.versionNumber);

  return <WikiHistoryDialogList versions={ sortedVersions } />;
};

Container.propTypes = {
  versionsFetch: React.PropTypes.instanceOf(PromiseState).isRequired,
};

const refetch = ({ wiki, section }) => {
  return {
    versionsFetch: ROOT_URL + `/wiki/section/allVersions?q=${ wiki.title }&sectionIndex=${ section.WikiSection.sectionIndex }`,
  };
};

export default connect(refetch)(Container);