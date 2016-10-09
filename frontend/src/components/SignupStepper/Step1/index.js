import React from 'react';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../Loading';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Action creators

// Component
import ChildComponent from './Step1';

// react-komposer
/*const composer = (props, onData) => {
  const user = Meteor.user();

  const initialValues = {
    displayName: user.displayName,
    gender: user.gender,
  };

  // Get homeUni
  if (user.homeUniId)
    Meteor.call('University.get', user.homeUniId, (err, homeUni) =>
      onData(null, {
        initialValues: {
          ...initialValues,
          homeUniName: homeUni ? homeUni.name : ""
        }
      }));
  else
    onData(null, { initialValues });

};*/

const mapStateToProps = (state) => {
  return{
    user:state.user.userObject
  };
};

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const Step1 = connect(mapStateToProps, mapDispatchToProps)(ChildComponent);

export default Step1;
