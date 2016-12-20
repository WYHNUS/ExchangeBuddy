import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChildComponent from './TopBar';

const mapStateToProps = (state) => {
  return {
    user: state['User/currentUser'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({  }, dispatch),
  };
};

const TopBar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default TopBar;
