import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChildComponent from './WikiSection';

const mapStateToProps = (state) => {
  return {
    userToken: state.user.token,
    isMobile: state['Browser/isMobile'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);