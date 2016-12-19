import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WikiHistoryButton from './WikiHistoryButton';

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({  }, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(WikiHistoryButton);

