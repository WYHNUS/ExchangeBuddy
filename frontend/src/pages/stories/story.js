import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
toggleTopBarBackButtonVisibility } from '../../actions/pageVisibility';

import StoryDetails from '../../components/StoriesComponent/StoryDetails';

import story1ImgUrl from '../../res/SEP-Application.png';

class Story extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarBackButtonVisibility(true);
	}
	componentWillUnmount(){
		this.props.toggleTopBarBackButtonVisibility(false);
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
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarBackButtonVisibility: visibility=>dispatch(toggleTopBarBackButtonVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Story);