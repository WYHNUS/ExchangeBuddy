import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {toggleHomeSearchDrawerVisibility} from '../../actions/pageVisibility';
import GroupList from '../../components/HomeComponent/Search/GroupList';
import cookie from 'react-cookie';

import {fetchAllGroups, fetchAllGroupsSuccess, fetchAllGroupsFailure, resetAllGroups} from '../../actions/home';
import { clearUser } from '../../actions/authActions';

/*
{<div className="row center-xs">
			{<SearchBar/>}
			</div>}*/
/*
			<div className="row center-xs">
			{<UniversitySearchList/>}
			</div>*/

const mapDispatchToProps = (dispatch) => {
	return {
		toggleHomeSearchDrawerVisibility: visibility=>dispatch(
			toggleHomeSearchDrawerVisibility(visibility)),
		fetchAllGroups: () => {
	      dispatch(fetchAllGroups()).payload.then((response) => {
	      	if (!response.error) {
	      		dispatch(fetchAllGroupsSuccess(response.body))
	      	}else{
	      		dispatch(fetchAllGroupsFailure(response.error))
	      	}
		}, (err) => {
	        if (err.status === 401) {
	          cookie.remove('authToken');
	          dispatch(clearUser());
	          // need to redirect to a new version of login page
	          browserHistory.push('/');
	        } else {
	          dispatch(fetchAllGroupsFailure(err.response.error.message));
	        }
	      })
	  }
	};
};

const mapStateToProps = (state)=>{
	return {
		homeSearchDrawerOpen: state.pageVisibility.homeSearchDrawerOpen,
		allGroups: state.homeSearchGroups.allGroups.allGroups
	};
}