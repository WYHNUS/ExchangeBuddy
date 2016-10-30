import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IdentifyUniForm from '../components/IdentifyUniForm';
import { 
  toggleBottomBarVisibility, toggleTopBarVisibility
} from '../actions/pageVisibility';


class IdentifyUniversity extends React.Component {

  componentDidMount() {
    this.props.toggleBottomBarVisibility(false);
    this.props.toggleTopBarVisibility(true);
  }

  componentWillUnmount(){
    this.props.toggleTopBarVisibility(false);
  }
  
  render() {
    return (
      <div style={{ padding: 30 }}>
        <h1>Complete your profile</h1>
        <IdentifyUniForm/>
      </div>
    );
  }
};

const mapStateToProps = (state)=>{
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyUniversity);