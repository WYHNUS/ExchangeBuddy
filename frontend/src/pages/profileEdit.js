import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
toggleTopBarSettingsButtonVisibility, toggleTopBarBackButtonVisibility } from 'actions/pageVisibility';

import ProfileForm from 'components/ProfileForm';


class ProfileEdit extends React.Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);	
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(false);
		this.props.toggleTopBarBackButtonVisibility(true);
	}

	componentWillUnmount(){
		this.props.toggleTopBarBackButtonVisibility(false);
	}

	render() {
		return (
			<div>
			<ProfileForm />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility)),
		toggleTopBarBackButtonVisibility:visibility=>dispatch(toggleTopBarBackButtonVisibility(visibility))
	};
};

export default connect(null, mapDispatchToProps)(ProfileEdit);