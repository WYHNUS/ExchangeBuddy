import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility } from '../actions/pageVisibility';
import SettingsList from '../components/Settings/SettingsList';

class Settings extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
	}

	render() {
		return (
			<div className="row center-xs">
			<div className="col-xs">
			<SettingsList/>
			
			</div>
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

const mapStateToProps = (state )=>{
	return{
		user: state.user.userObject
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);