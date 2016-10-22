import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility } from '../../actions/pageVisibility';

import StoryList from '../../components/StoriesComponent/StoryList';

import story1ImgUrl from '../../res/SEP-Application.png';


class Stories extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
	}

	render() {
		return (
			<div>
			<StoryList/>
			</div>
			);
	}

}

const mapStateToProps = (state )=>{
	return{
	};
}


const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);