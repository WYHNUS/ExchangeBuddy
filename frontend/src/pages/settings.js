import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';

class Settings extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
	}

	render() {
		return (
			<div>
			Settings
			</div>
			);
	}

}
const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility))
	};
};

const mapStateToProps = (state )=>{
	return{
		user: state.user.userObject
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);