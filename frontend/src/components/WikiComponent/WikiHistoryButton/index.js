import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWikiPage } from 'actions/wiki';

import WikiHistoryDropdown from './WikiHistoryDropdown';

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ fetchWikiPage }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(WikiHistoryDropdown);