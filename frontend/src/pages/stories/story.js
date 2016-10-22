import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility } from '../../actions/pageVisibility';

import StoryDetails from '../../components/StoriesComponent/StoryDetails';

import story1ImgUrl from '../../res/SEP-Application.png';

class Story extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(false);
		this.props.toggleTopBarVisibility(true);
	}

	render() {
		return (
			<div>
				<StoryDetails/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Story);