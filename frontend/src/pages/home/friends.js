import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbar } from '../../actions/messageSnackbar';
import { pageVisibility } from '../../actions/pageVisibility';
import MemberList from '../../components/HomeComponent/Friends/MemberList';
import {toggleHomeTab} from '../../actions/home'


class Friends extends React.Component{

	componentWillMount(){
		this.props.toggleHomeTab('friends');
	}

	render(){
		return(
		<Grid>
		<div className="friends-container">
		<MemberList groupId={ parseInt(this.props.params.id) }/>
		</div>
		</Grid>);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ showSnackbar }, dispatch),
    toggleHomeTab:(tab)=>dispatch(toggleHomeTab(tab))
  };
};

const mapStateToProps = (state)=>{
	return {
		params: state.home.homeGroupDetails.homeGroupDetails
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);