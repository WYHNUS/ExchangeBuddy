import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility } from '../actions/pageVisibility';

class Stories extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
	}

	render() {
		return (
			<div>
			Stories
			</div>
			);
	}

}
const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility))
	};
};

export default connect(null, mapDispatchToProps)(Stories);