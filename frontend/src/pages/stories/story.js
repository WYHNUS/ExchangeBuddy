import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';

import StoryList from '../../components/StoriesComponent/StoryDetails';

import story1ImgUrl from '../../res/SEP-Application.png';

class Story extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
	}

	render() {
		return (
			<div>
			<StoryDetails story={this.props.story}/>
			</div>
			);
	}

}

const mapStateToProps = (state )=>{
	return{
		story: Story
	};
}


const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Story);