import { connect } from 'react-redux';
import GroupHeader from './GroupHeader';

const mapStateToProps = (state) => {
  return {
    isMobile: state['Browser/isMobile'],
  };
};

export default connect(mapStateToProps)(GroupHeader);