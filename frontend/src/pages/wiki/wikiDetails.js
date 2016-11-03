import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// import actions
import { 
	toggleBottomBarVisibility, toggleTopBarVisibility,
	toggleTopBarBackButtonVisibility 
} from '../../actions/pageVisibility';
import {
	fetchWikiPage
} from '../../actions/wiki';

import WikiDetail from '../../components/WikiComponent/WikiDetail';

class WikiDetails extends React.Component{
	componentWillMount() {
		console.log(this.props.wikiTitle);
		// query backend based on wikiName
		this.props.fetchWikiPage(this.props.wikiTitle);
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarBackButtonVisibility(true);
	}
	componentWillUnmount(){
		this.props.toggleTopBarBackButtonVisibility(false);
	}

	render() {
		const { error, fetching } = this.props;

		return (
			<div>
				{
					fetching ?
						<p> fetching resource ... </p>
					:
						error ?
							<p> { error } </p>
						:
							<WikiDetail />
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		wikiTitle: state.routing.locationBeforeTransitions.pathname.split("/")[2],
		error: state.wiki.error,
		fetching: state.wiki.fetching
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility => dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility => dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarBackButtonVisibility: visibility => dispatch(toggleTopBarBackButtonVisibility(visibility)),
		fetchWikiPage: (title) => dispatch(fetchWikiPage(title)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiDetails);