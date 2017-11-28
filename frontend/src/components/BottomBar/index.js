import { connect } from 'react-redux';
import ChildComponent from './BottomBar';

const mapStateToProps = (state) => {
  return {
    user: state['User/currentUser'],
  };
}
const mapDispatchToProps = () => {
  return {

  };
};


const BottomBar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default BottomBar;