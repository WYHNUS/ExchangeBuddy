import React from 'react';

import ChildComponent from './GroupIndicator';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showSnackbar } from '../../../../actions/messageSnackbar';
import { clearUser } from '../../../../actions/authActions';
import {addingGroupSuccessUpdate, leavingGroupSuccessUpdate} from '../../../../actions/home';
import { fetchAllUniversitiesSuccess, fetchAllUniversitiesFailure } from '../../../../actions/utilityInfo';


const mapDispatchToProps = (dispatch) => {
	return {
		clearUser: () => {
			dispatch(clearUser());
		},
		showSnackbar: (message) => {
			dispatch(showSnackbar(message))
		},
		addingGroupSuccessUpdate:(userObject)=>{
			dispatch(addingGroupSuccessUpdate(userObject))
		},
		leavingGroupSuccessUpdate:(userObject)=>{
			dispatch(leavingGroupSuccessUpdate(userObject))
		},
		/*fetchAllUniversities:() => {
			fetchAllUniversities().payload.then((response) => {
				if (!response.error) {
					dispatch(fetchAllUniversitiesSuccess(response.data));
				} else {
					dispatch(fetchAllUniversitiesFailure(response.error));
				}
			})
		},*/
		fetchAllUniversitiesSuccess:(uni)=>{
			dispatch(fetchAllUniversitiesSuccess(uni));
		},
		fetchAllUniversitiesFailure:(error)=>{
			dispatch(fetchAllUniversitiesFailure(error));
		}
	};
};

const mapStateToProps = (state) => {
	return {
		userObject:state.user.userObject,
		homeGroupDetails: state.home.homeGroupDetails,
		universities: state.utilityInfo.universitiesList.universities,
		homeGroups: state.home.homeGroups.homeGroups
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildComponent);
