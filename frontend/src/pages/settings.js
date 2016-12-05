import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility, 
	toggleTopBarBackButtonVisibility
} from 'actions/pageVisibility';
import SettingsList from 'components/Settings/SettingsList';

class Settings extends React.Component{

	componentDidMount() {

		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarBackButtonVisibility(true);

		if(!(this.props.user.isLoggedIn===true)){
			this.props.toggleBottomBarVisibility(false);
			
		}else{
			this.props.toggleBottomBarVisibility(true);
		}

	}

	componentWillUnmount(){
		this.props.toggleTopBarBackButtonVisibility(false);
		this.props.toggleTopBarVisibility(false);
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
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarBackButtonVisibility: visibility=>dispatch(toggleTopBarBackButtonVisibility(visibility))
	};
};

const mapStateToProps = (state )=>{
	return{
		user: state.user
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);