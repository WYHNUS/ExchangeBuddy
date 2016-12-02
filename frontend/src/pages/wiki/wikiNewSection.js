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

import WikiContentTable from '../../components/WikiComponent/WikiContentTable';
import WikiSection from '../../components/WikiComponent/WikiSection';
import WikiSectionForm from '../../components/WikiComponent/WikiSectionForm';

class WikiDetails extends React.Component{
	componentWillMount() {
		const { wikiTitle } = this.props;
		const { wiki, needReload } = this.props.wiki;
		// check if the info stored in reducer matches with the one stored in URL
		if (wikiTitle !== wiki.title || needReload) {
			this.props.fetchWikiPage(wikiTitle);
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
		const { sectionIndex } = this.props;
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
								<WikiSectionForm wikiName={ wiki.title } />
							</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		wikiTitle: state.routing.locationBeforeTransitions.pathname.split('/')[3],
		wiki: state.wiki
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