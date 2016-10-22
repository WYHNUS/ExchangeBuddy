import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility } from '../actions/pageVisibility';

class NotLoggedIn extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(false);
		this.props.toggleTopBarVisibility(false);
	}

	render() {
		return (
			<div>
			notloggedin
			</div>
			);
	}

}
const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility))
	};
};

export default connect(null, mapDispatchToProps)(NotLoggedIn);