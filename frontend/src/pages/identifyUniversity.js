import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IdentifyUniForm from '../components/IdentifyUniForm';
import { 
  toggleBottomBarVisibility, toggleTopBarVisibility, toggleTopBarBackButtonVisibility
} from '../actions/pageVisibility';


class IdentifyUniversity extends React.Component {
  componentDidMount() {
    this.props.toggleTopBarVisibility(true);
    if(this.isProfileEdit()){
      this.props.toggleTopBarBackButtonVisibility(true);
      this.props.toggleBottomBarVisibility(true);
    }else{
      this.props.toggleBottomBarVisibility(false);
    }
    
  }

  componentWillUnmount(){
    this.props.toggleTopBarVisibility(false);
    if(this.isProfileEdit()){
      this.props.toggleTopBarBackButtonVisibility(false);
    }    
  }
  
  render() {
    return (
      <div style={{ padding: 30 }}>
        { this.isProfileEdit()
          ? <div>
              <h1>Edit your profile</h1>
              <h3>Note that changing your universities will change your default groups!</h3>
            </div>
          : <h1>Complete your profile</h1>
        }
        
        <IdentifyUniForm/>
      </div>
    );
  }

  isProfileEdit() {
    if (window.location.pathname.split('/')[1] === 'profile') {
      return true;
    } else {
      return false;
    }
  }
}

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
    toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
    toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
    toggleTopBarBackButtonVisibility:visibility=>dispatch(toggleTopBarBackButtonVisibility(visibility))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyUniversity);