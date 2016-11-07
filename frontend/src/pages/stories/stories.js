import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
 toggleTopBarSettingsButtonVisibility} from '../../actions/pageVisibility';

import StoryList from '../../components/StoriesComponent/StoryList';

import { fetchAllStories } from '../../actions/stories';

class Stories extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(true);
		this.props.fetchAllStories();
		//window.open( "http://www.exchangebuddy.com/experiences/", "_blank");
	}

	componentWillUnmount(){
		this.props.toggleTopBarSettingsButtonVisibility(false);
	}

	render() {
		return (
			<div>

			<div className="stories-bar">
				<h2>Stories</h2>
			</div>

			<div className='stories-container-wrapper'>
				<StoryList/>
			</div>

			<div style={{'margin':'50px', 'textAlign':'center'}}>
				<p>Enjoyed your senior's stories? <span>
				<a href="http://www.exchangebuddy.com/experiences/" target="_blank">View more</a></span> from our website!
				</p>
			</div>

			<div style={{'margin':'50px', 'textAlign':'center'}}>
				<p>Want to contribute?</p>
				<a href="mailto:exchangebuddycontact@gmail.com" target="_blank">
					Contact us!
				</a>
			</div>

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
		toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility)),
		fetchAllStories: () => {
	    	dispatch(fetchAllStories());
	    }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);