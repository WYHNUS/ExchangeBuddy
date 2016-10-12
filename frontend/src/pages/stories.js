import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';

import StoryList from '../components/StoriesComponent/StoryList';

var stories =
[
{
	id:1,
	content:'hdlhsskhlshakajdhladjshlfkadsj'
},
{
	id:2,
	content:'hdlhsskhlshakajdhladjshlfkadsj'
}

];

class Stories extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
	}

	render() {
		return (
			<div>
			<StoryList stories={this.props.stories}/>
			</div>
			);
	}

}

const mapStateToProps = (state )=>{
	return{
		stories: stories
	};
}


const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);