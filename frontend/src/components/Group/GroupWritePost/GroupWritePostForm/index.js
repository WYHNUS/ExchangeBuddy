import { connect } from 'react-redux';
import ChildComponent from './GroupWritePostForm';

const mapStateToProps = (state) => ({
  user: state['User/currentUser']
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);