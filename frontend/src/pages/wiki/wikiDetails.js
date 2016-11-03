import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
toggleTopBarBackButtonVisibility } from '../../actions/pageVisibility';

import WikiDetail from '../../components/WikiComponent/WikiDetail';

class WikiDetails extends React.Component{

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
				<p>{this.props.wikiName}</p>
			</div>
		);
	}
}

const mapStateToProps = (state )=>{
	return{
		wikiName: state.routing.locationBeforeTransitions.pathname.split("/")[2]
	};
}


const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarBackButtonVisibility: visibility=>dispatch(toggleTopBarBackButtonVisibility(visibility))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiDetails);