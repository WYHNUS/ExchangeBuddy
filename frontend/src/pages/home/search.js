import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Drawer from 'material-ui/Drawer';
import SearchInput, {createFilter} from 'react-search-input'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {toggleHomeSearchDrawerVisibility} from '../../actions/pageVisibility';
import GroupList from '../../components/HomeComponent/Search/GroupList';
import SearchBar from '../../components/HomeComponent/Search/SearchBar';
import UniversitySearchList from '../../components/HomeComponent/Search/UniversitySearchList';

const Search = React.createClass({

	render(){
		return(
			<Drawer 
			className="groupSearchLayout"
			width={window.innerWidth/3*2} 
			openSecondary={true} 
			open={this.props.homeSearchDrawerOpen}
			disableSwipeToOpen={false}
			docked={false} 
			onRequestChange={(open) => this.props.toggleHomeSearchDrawerVisibility(open)}>

			<div className="row center-xs">
			<SearchBar/>
			</div>
			<div className="row center-xs">
			<GroupList/>
			</div>
			<div className="row center-xs">
			<UniversitySearchList/>
			</div>

			

			</Drawer>
			);
	}

})



const mapDispatchToProps = (dispatch) => {
	return {
		toggleHomeSearchDrawerVisibility: visibility=>dispatch(toggleHomeSearchDrawerVisibility(visibility))
	};
};

const mapStateToProps = (state)=>{
	return {
		homeSearchDrawerOpen: state.pageVisibility.homeSearchDrawerOpen
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);