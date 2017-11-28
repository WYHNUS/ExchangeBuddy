import { connect } from 'react-redux';
import ChildComponent from './GroupFeedPostContent';

const mapStateToProps = (state) => ({
  user: state['User/currentUser'],
});

export default connect(mapStateToProps)(ChildComponent);