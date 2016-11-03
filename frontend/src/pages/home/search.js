import React, {Component, PropTypes} from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import SearchInput, {createFilter} from 'react-search-input'

import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip'

import GroupList from '../../components/HomeComponent/Search/GroupList';
import {fetchAllGroups, fetchAllGroupsSuccess, fetchAllGroupsFailure, resetAllGroups,
	fetchCurrentGroup, fetchCurrentGroupSuccess, fetchCurrentGroupFailure, toggleHomeTab
} from '../../actions/home';
import { toggleHomeSearchDrawerVisibility } from '../../actions/pageVisibility';
import { toggleSelectedHomeGroup } from '../../actions/home';
import { clearUser } from '../../actions/authActions';

class Search extends Component {

	constructor(props){
		super(props);
		this.state={
			isSearchOpen: false,
			groupListShown: [],
			value:"",
			filterChips:[true,true,true,true,true]
		}
	}

	toggleSearch(toggle){
		this.setState({...this.state, isSearchOpen:toggle});
		if(toggle){
			this.refs.searchField.focus();
			this.populateGroups();
		}else{
			this.refs.searchField.blur();
		}
	}

	populateGroups(){
		//only fetch groups if there are no groups currently
		if(this.props.allGroups.length===0){
			this.props.fetchAllGroups();
		}
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

	filterChange=(event)=>{

		this.setState({...this.state, value: event.target.value});
		var tempList = [];

		for(var i=0;i<this.props.allGroups.length;i++){

			if(this.filterText(event.target.value,this.props.allGroups[i].name)){
				//check to see if within the filtered targets
				if(this.state.filterChips[this.props.allGroups[i].groupType]){
					tempList.push(this.props.allGroups[i])	
				}
			}
		}

		this.setState({groupListShown:tempList});
	}

	filterText(searchText, key){

		searchText = searchText.toLowerCase();
		key = key.toLowerCase().replace(/[^a-z0-9 ]/g, '');

		if (searchText.length < 1)
			return false;

		return searchText.split(' ').every(searchTextSubstring =>
			key.split(' ').some(s => s.substr(0, searchTextSubstring.length) == searchTextSubstring)
			);
	}

	handleChipTap=(int)=>{

		var newFilterChips = this.state.filterChips.slice();
		var isSelected = !newFilterChips[int]
		newFilterChips[int]= isSelected;
		this.setState({...this.state, filterChips: newFilterChips});
		var tempList = [];

		for(var i=0;i<this.props.allGroups.length;i++){

			if(this.filterText(this.state.value,this.props.allGroups[i].name)){
				
				//cannot wait for value propagation
				if(this.props.allGroups[i].groupType===int){
					if(isSelected){
						tempList.push(this.props.allGroups[i]);	
					}
				}else if(this.state.filterChips[this.props.allGroups[i].groupType]){
					tempList.push(this.props.allGroups[i]);
				}
			}
		}
		this.setState({groupListShown:tempList});
	}

	getDataSource = () =>{
		if(this.state.value===""){
			return this.props.allGroups;
		}else{
			return this.state.groupListShown;
		}
	}

	render(){
		const{allGroups, toggleHomeTab, toggleHomeSearchDrawerVisibility, fetchNewGroup}=this.props;
		const{groupListShown, filterChips} = this.state;

		const goToGroup = (id) => { 
			browserHistory.push(`/home/${id}`);
			fetchNewGroup(id);
			toggleHomeTab('friends');
			toggleHomeSearchDrawerVisibility(false); 
		};

		const styles = {
		  chip: {
		    margin: 4,
		  },
		  wrapper: {
		    display: 'flex',
		    flexWrap: 'wrap',
		  },
		};

		return(
			<Drawer 
			className="group-search-layout"
			width={this.getSearchWidth()} 
			openSecondary={true} 
			open={this.props.homeSearchDrawerOpen}
			disableSwipeToOpen={false}
			docked={false} 
			onRequestChange={(open) => this.props.toggleHomeSearchDrawerVisibility(open)}>

			<div className="row search-container center-xs middle-xs">
			<div className={this.state.isSearchOpen?("col-xs-9 col-md-10 col-lg-11"):("col-xs-12")}>
			<TextField
			ref="searchField"
			hintText="Search" className="search-textfield"
			value={this.state.value}
			onChange={this.filterChange}
			onTouchTap={(e) => { e.preventDefault();this.toggleSearch(true)}}/>
			</div>
			{
				(this.state.isSearchOpen)?
				(
					<div className="col-xs-3 col-md-2 col-lg-1">
					<FlatButton label="Cancel" className='search-cancel'
					onTouchTap={(e)=>{ e.preventDefault();this.toggleSearch(false)}}/>
					</div>
					)
				:
				null
			}
			</div>
			{
				(this.state.isSearchOpen)?
				(
					<div className="row center-xs">

					<hr className='seperator'/>

					<div style={styles.wrapper} className='search-chip-wrapper'>
					<Chip className={filterChips[0]?("selected-chip"):("deselected-chip")} 
					style={styles.chip} onTouchTap={()=>this.handleChipTap(0)}>
					Exchange University
					</Chip>
					<Chip className={filterChips[1]?("selected-chip"):("deselected-chip")}
					style={styles.chip} onTouchTap={()=>this.handleChipTap(1)}>
					Home University
					</Chip>
					<Chip className={filterChips[2]?("selected-chip"):("deselected-chip")}
					style={styles.chip} onTouchTap={()=>this.handleChipTap(2)}>
					Alumni Support
					</Chip>
					<Chip className={filterChips[3]?("selected-chip"):("deselected-chip")}
					style={styles.chip} onTouchTap={()=>this.handleChipTap(3)}>
					Special
					</Chip>
					<Chip className={filterChips[4]?("selected-chip"):("deselected-chip")}
					style={styles.chip} onTouchTap={()=>this.handleChipTap(4)}>
					Interested
					</Chip>
					</div>

					<hr className='seperator'/>

					<List>
					{this.getDataSource().map((group,idx)=>(
						(parseInt(group.groupType)==0)?
						(
							<ListItem
							key={idx}
							primaryText={getName(group.name)}
							secondaryText={`${getTerm(group.name)} ${getYear(group.name)}`}
							onTouchTap={()=>goToGroup(group.id)}
							/>
							):
						(
							(parseInt(group.groupType) == 1) ?
							(
								<ListItem
								key={idx}
								primaryText={getName(group.name)}
								secondaryText={`${getYear(group.name)}`}
								onTouchTap={()=>goToGroup(group.id)}
								/>
								):
							(
								<ListItem
								key={idx}
								primaryText={group.name}
								onTouchTap={()=>goToGroup(group.id)}
								/>	
								)
							)
						))}
					</List>
					</div>	
					):
				(
					<div>
					<div className="row center-xs">
					<h2>My groups</h2>
					</div>
					<div className="row center-xs">
					<GroupList/>
					</div>
					</div>	
					)
			}	

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
		},
		fetchNewGroup: (groupId) => {
			dispatch(fetchCurrentGroup(groupId)).payload.then((response) => {
				if (!response.error) {
					dispatch(fetchCurrentGroupSuccess(response.body));
				} else {
					dispatch(fetchCurrentGroupFailure(response.error));
				}
			}, (err) => {
				if (err.status === 401) {
					cookie.remove('authToken');
					dispatch(clearUser());
	          // need to redirect to a new version of login page
	          browserHistory.push('/');
	      } else {
	      	dispatch(fetchCurrentGroupFailure(err.response.error.message));
	      }
	  });
		},
		toggleHomeSearchDrawerVisibility: visibility => dispatch(toggleHomeSearchDrawerVisibility(visibility)),
		toggleSelectedHomeGroup: index => dispatch(toggleSelectedHomeGroup(index)),
		toggleHomeTab: tabValue => dispatch(toggleHomeTab(tabValue)),
	};
};

const mapStateToProps = (state)=>{
	return {
		homeSearchDrawerOpen: state.pageVisibility.homeSearchDrawerOpen,
		allGroups: state.homeSearchGroups.allGroups.allGroups
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

function getName(homeGroupDetailsName){
	return homeGroupDetailsName.trim().split("--")[0].trim();
}

function getTerm(homeGroupDetailsName){
	return homeGroupDetailsName.trim().split("--")[1].trim().split(" ")[2];
}

function getYear(homeGroupDetailsName){
	return homeGroupDetailsName.trim().split("--")[1].trim().split(" ")[1];
}