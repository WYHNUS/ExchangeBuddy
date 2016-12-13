import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// import actions
import {
	fetchWikiPage
} from 'actions/wiki';

import WikiContentTable from 'components/WikiComponent/WikiContentTable';
import WikiSection from 'components/WikiComponent/WikiSection';

var shouldRefresh = false;

class WikiDetails extends React.Component {
	componentWillMount() {
		const { params, wiki } = this.props;

		// tmpSectionParam = sectionParam;
		if (!params.splat) {
			// return to latest wiki
			browserHistory.push('/wiki/' + params.wikiTitle);
		} else {
			// process sectionParam and check validity of sectionParamArray
			var isValid = true;
			var sectionParamArray = params.splat.split('&');
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
				browserHistory.push('/wiki/' + params.wikiTitle);
			}

			// check if the info stored in reducer matches with the one stored in URL, and if sectionIndex is valid
			if (params.wikiTitle !== wiki.wiki.title || wiki.needReload) {
				this.props.fetchWikiPage(params.wikiTitle, queryArray);
			}
		}
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
							<div className="wiki-detail-wrapper">
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
		wiki: state.wiki
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchWikiPage: (title, queryArray) => dispatch(fetchWikiPage(title, queryArray)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiDetails);