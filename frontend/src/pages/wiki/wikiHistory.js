import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// import actions
import { 
	toggleBottomBarVisibility, toggleTopBarVisibility,
	toggleTopBarBackButtonVisibility 
} from '../../actions/pageVisibility';
import {
	fetchWikiPage
} from '../../actions/wiki';

import WikiContentTable from '../../components/WikiComponent/WikiContentTable';
import WikiSection from '../../components/WikiComponent/WikiSection';

class WikiDetails extends React.Component{

	componentWillMount() {
		const { wikiTitle, sectionParam, wiki } = this.props;
console.log(sectionParam);
		if (!sectionParam) {
			// return to latest wiki
			browserHistory.push('/wiki/' + wikiTitle);
		} else {
			// process sectionParam and check validity of sectionParamArray
			var isValid = true;
			var sectionParamArray = sectionParam.split('&');
			var queryArray = [];

			for (var i=0; i<sectionParamArray.length; i++) {
				var tmp = sectionParamArray[i].split('=');
				if (tmp.length !== 2 || tmp[0].indexOf('section') !== 0 || 
					isNaN(tmp[0].substring(7)) || isNaN(tmp[1])) {
					isValid = false;
				}
				queryArray.push({ 
					sectionIndex: tmp[0].substring(7), 
					versionIndex: tmp[1]
				})
			}

			// redirect back if query param not valid
			if (!isValid) {
				browserHistory.push('/wiki/' + wikiTitle);
			}

			// check if the info stored in reducer matches with the one stored in URL, and if sectionIndex is valid
			// if (wikiTitle !== wiki.wiki.title || this.props.wiki.needReload) {
				this.props.fetchWikiPage(wikiTitle, queryArray);
			// }
		}
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarBackButtonVisibility(true);
	}
	componentWillUnmount() {
		this.props.toggleTopBarBackButtonVisibility(false);
	}


	render() {
		const { error, fetching, wiki, sections } = this.props.wiki;

		return (
			<div>
				{
					fetching ?
						<p> fetching resource ... </p>
					:
						error ?
							error.message ?
								<p> { error.message } </p>
							: <p>{ error }</p>
						:
							<div className="wikiDetailWrapper">
								<h1>{ wiki.title }</h1>
								<WikiContentTable sections={ sections } />

								<div>
									{ 
										(sections.length > 0) ? (
											sections.map(function(section, idx){
												return (
													<WikiSection
														wikiTitle={ wiki.title }
														section={ section } 
														key={ idx } 
													/>
												) 
											})
										) : null
									}
								</div>
							</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		wikiTitle: state.routing.locationBeforeTransitions.pathname.split("/")[3],
		sectionParam: state.routing.locationBeforeTransitions.pathname.split("/")[4],
		wiki: state.wiki
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility => dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility => dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarBackButtonVisibility: visibility => dispatch(toggleTopBarBackButtonVisibility(visibility)),
		fetchWikiPage: (title, queryArray) => dispatch(fetchWikiPage(title, queryArray)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiDetails);