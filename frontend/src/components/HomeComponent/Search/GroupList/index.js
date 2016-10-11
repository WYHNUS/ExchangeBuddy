import React from 'react';

import ChildComponent from './GroupList';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {toggleHomeSearchDrawerVisibility} from '../../../../actions/pageVisibility';

/*var owngroups = 
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
},
{
	name: 'NCST Batch 32',
	id: '4',
	groupType: 3
}
]*/

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		actions: bindActionCreators({  }, dispatch),
		toggleHomeSearchDrawerVisibility: visibility=>dispatch(toggleHomeSearchDrawerVisibility(visibility))
	};
};

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.user.userObject,
		groups: state.home.homeGroups.homeGroups,
		homeGroups: state.home.homeGroups
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);