import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IdentifyUniForm from '../components/IdentifyUniForm';

const IdentifyUniversity = () => (
  <div>
    <h1>Complete your profile</h1>
    <IdentifyUniForm/>
  </div>
);

const mapStateToProps = (state)=>{
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdentifyUniversity);