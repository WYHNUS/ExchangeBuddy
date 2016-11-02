import React, {Component, PropTypes} from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Drawer from 'material-ui/Drawer';
import SearchInput, {createFilter} from 'react-search-input'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {toggleHomeSearchDrawerVisibility} from '../../actions/pageVisibility';
import GroupList from '../../components/HomeComponent/Search/GroupList';
import cookie from 'react-cookie';

import {fetchAllGroups, fetchAllGroupsSuccess, fetchAllGroupsFailure, resetAllGroups} from '../../actions/home';
import { clearUser } from '../../actions/authActions';

import RaisedButton from 'material-ui/RaisedButton';


class Search extends Component {

	constructor(props){
		super(props);
		this.state={
	      isSearchOpen: false
	    }
	}

	toggleSearch(toggle){
		this.setState({...this.state, isSearchOpen:toggle});
	}

	getSearchWidth(){
		if(this.state.isSearchOpen){
			return window.innerWidth;
		}else{
			if((window.innerWidth/3*2)>500){
				return 500;
			}else{
				return (window.innerWidth/3*2);
			}
		}
	}

	componentDidMount(){
		this.props.fetchAllGroups();
	}

	render(){
		return(
			<Drawer 
			className="group-search-layout"
			width={this.getSearchWidth()} 
			openSecondary={true} 
			open={this.props.homeSearchDrawerOpen}
			disableSwipeToOpen={false}
			docked={false} 
			onRequestChange={(open) => this.props.toggleHomeSearchDrawerVisibility(open)}>

			<div className="row center-xs">
			<RaisedButton label='Search' 
			onTouchTap={()=>{this.toggleSearch(true)}}/>
			</div>

			<div className="row center-xs">
			<h2>My groups</h2>
			</div>

			<div className="row center-xs">
			<GroupList/>
			</div>			

			</Drawer>
			);
	}

}

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

export default connect(mapStateToProps, mapDispatchToProps)(Search);