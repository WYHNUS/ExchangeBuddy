import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Spinner from 'react-spinkit';

import { 
	toggleBottomBarVisibility, toggleTopBarVisibility,
	toggleTopBarSettingsButtonVisibility 
} from '../../actions/pageVisibility';
import {
	fetchRecommendation
} from '../../actions/wiki';

import WikiRecommendation from '../../components/WikiComponent/WikiRecommendation';

class Wiki extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			wikisShown: [],
			value: ""
		}
	}

	componentWillMount() {
		// need to check if already in reducer ?
		this.props.fetchRecommendation();
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(true);
	}

	componentWillUnmount() {
		this.props.toggleTopBarSettingsButtonVisibility(false);
	}

	filterChange = (event) => {
		this.setState({...this.state, value: event.target.value});
		const { allWikis } = this.props;

		var tempList = [];
		// set a min length to filter
		if (event.target.value.length >= 3) {
			for (var i=0; i<allWikis.length; i++) {
				if (this.filterText(event.target.value, allWikis[i].name)) {
					tempList.push(allWikis[i])
				}
			}
		}
		this.setState({wikisShown:tempList});
	}

	filterText(searchText, key) {
		searchText = searchText.toLowerCase();
		key = key.toLowerCase().replace(/[^a-z0-9 ]/g, '');

		if (searchText.length < 1)
			return false;

		return searchText.split(' ').every(searchTextSubstring =>
			key.split(' ').some(s => s.substr(0, searchTextSubstring.length) == searchTextSubstring)
		);
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
									return (
										<WikiRecommendation previewItem={ wikiPreview } key={ idx } />
									) 
								})
							)
						: <Spinner spinnerName="circle" />
					}
					</ul>

					<hr className="green-separator" style={{ width: "85%"}}></hr>
				</div>

				<div className="search wiki-recommendation-wrapper">
					<TextField
						hintText="Search for more! :D" 
						className="search-textfield"
						style={{width: '50%'}}
						value={this.state.value}
						onChange={this.filterChange}
					/>

					<ul className="recommendation-item-list">
					{ this.state.wikisShown.length > 0 ?
						(
							(this.state.wikisShown.map(function(wiki, idx) {
								return (
									<WikiRecommendation previewItem={ wiki } key={ idx } />
								) 
							}))
						)
						: null
					}	
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		recommendWikis: state.wiki.previews,
		allWikis: state.wiki.allWikis
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