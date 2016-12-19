import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators
import { hideSnackbar } from 'actions/MessageSnackbar';

// Component
import ChildComponent from './MessageSnackbar';

const mapStateToProps = (state) => {
  return {
    open: state['MessageSnackbar/isOpen'],
    message: state['MessageSnackbar/message'],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ hideSnackbar }, dispatch),
  };
};

const MessageSnackbar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default MessageSnackbar;
