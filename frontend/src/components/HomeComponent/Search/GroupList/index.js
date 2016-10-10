import React from 'react';

import ChildComponent from './GroupList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var owngroups = 
[
{
	name: 'KTH Royal Institute of Technology exchange students -- Spring 2016',
	id: '1',
	groupType: 0
},
{
	name: 'National University of Singapore going abroad -- Spring 2016',
	id: '2',
	groupType: 1
},
{
	name: 'National University of Singapore students in KTH Royal Institute of Technology',
	id: '3',
	groupType: 2
}
]

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({  }, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.userObject,
  	groups: owngroups
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);