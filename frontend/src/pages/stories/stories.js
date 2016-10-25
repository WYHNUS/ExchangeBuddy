import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
 toggleTopBarSettingsButtonVisibility} from '../../actions/pageVisibility';

import StoryList from '../../components/StoriesComponent/StoryList';

class Stories extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(true);
		//window.open( "http://www.exchangebuddy.com/experiences/", "_blank");
	}

	componentWillUnmount(){
		this.props.toggleTopBarSettingsButtonVisibility(false);
	}

	render() {
		return (
			<div style={{'margin':'50px', 'marginTop':'100px', 'textAlign':'center'}}>
				<p>Click here to view current stories from our website!</p>
				<a href="http://www.exchangebuddy.com/experiences/" target="_blank">
					Stories
				</a>
			</div>
		);
	}
	// return (
	// 	<div>
	// 		<StoryList/>
	// 	</div>
	// );
}

const mapStateToProps = (state )=>{
	return{
	};
}


const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);