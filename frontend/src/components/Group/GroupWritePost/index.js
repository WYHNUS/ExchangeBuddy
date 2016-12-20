import { connect } from 'react-redux';
import ChildComponent from './GroupWritePost';

const mapStateToProps = (state) => ({
  user: state['User/currentUser'],
});

export default connect(mapStateToProps)(ChildComponent);