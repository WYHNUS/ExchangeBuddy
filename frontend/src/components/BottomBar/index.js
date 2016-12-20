import { connect } from 'react-redux';
import ChildComponent from './BottomBar';

const mapStateToProps = () => {
  return {

  };
}
const mapDispatchToProps = () => {
  return {

  };
};


const BottomBar = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default BottomBar;