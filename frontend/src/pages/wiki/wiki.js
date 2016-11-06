import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { 
	toggleBottomBarVisibility, toggleTopBarVisibility,
	toggleTopBarSettingsButtonVisibility 
} from '../../actions/pageVisibility';
import {
	fetchRecommendation
} from '../../actions/wiki';

import WikiRecommendation from '../../components/WikiComponent/WikiRecommendation';

class Wiki extends React.Component {
	componentWillMount() {
		// need to check if already in reducer ?
		this.props.fetchRecommendation();
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(true);
	}

	componentWillUnmount(){
		this.props.toggleTopBarSettingsButtonVisibility(false);
	}

	// if user is signedin, display wiki related to his home and exchange Universities
	// as well as the related two Countries as Recommendation
	// otherwise display mostly viewed wiki OR Singapore and NUS as default (for now...)
	// later maybe can use user's location to give suggestions?
	render() {
		const { recommendWikis } = this.props;

		return (
			<div>
				<div className="wiki-recommendation-wrapper">
					<div className="recommendation-nav-bar">
						<h2>Recommendation</h2>
					</div>
					<hr className="green-separator" style={{ width: "85%"}}></hr>

					<ul className="recommendation-item-list">
					{
						(recommendWikis.length > 0) ?
							(
								recommendWikis.map(function(wikiPreview, idx){
									console.log(wikiPreview);
									return (
										<WikiRecommendation previewItem={ wikiPreview } key={ idx } />
									) 
								})
							)
						: null
					}
					</ul>

					<hr className="green-separator" style={{ width: "85%"}}></hr>
				</div>
				<div className="search">
					
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		recommendWikis: state.wiki.previews
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility)),
		fetchRecommendation: () => dispatch(fetchRecommendation()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Wiki);