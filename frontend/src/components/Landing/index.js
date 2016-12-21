import { connect } from 'react-redux';
import Landing from './Landing';

const mapStateToProps = (state) => {
  return {
    user: state['User/currentUser'],
  };
};

export default connect(mapStateToProps)(Landing);