import request from 'superagent';
import { bearer } from '../util/bearer';
import { ROOT_URL } from '../util/backend';

export const INITIALIZE_WIKI_FORM = 'INITIALIZE_WIKI_FORM';

export const CLICK_SUBMIT = 'CLICK_SUBMIT';
export const CREATE_SECTION_VERSION_SUCCESS = 'CREATE_SECTION_VERSION_SUCCESS';
export const CREATE_SECTION_VERSION_FAIL = 'CREATE_SECTION_VERSION_FAIL';

export const FECTCH_WIKI_PAGE = 'FECTCH_WIKI_PAGE';
export const FECTCH_WIKI_PAGE_SUCCESS = 'FECTCH_WIKI_PAGE_SUCCESS';
export const FECTCH_WIKI_PAGE_FAIL = 'FECTCH_WIKI_PAGE_FAIL';

export function clickedFetch() {
    return { type: FECTCH_WIKI_PAGE };
}

/*	Get one story 	*/
export function fetchWikiSuccess(wiki, sections) {
    return { type: FECTCH_WIKI_PAGE_SUCCESS, wiki, sections };
}
export function fetchWikiFail(error) {
    return { type: FECTCH_WIKI_PAGE_FAIL, error };
}
export function fetchWikiPage(wikiTitle, additionalParam=null) {
	return (dispatch) => {
	    dispatch(clickedFetch());

	    var query = 'q=' + wikiTitle;
	    if (!!additionalParam) {
	    	query += ('&param=' + JSON.stringify(additionalParam));
	    }
	    request.get(ROOT_URL + '/wiki')
	    	.query(query)
	    	.end(function(err, res){
				console.log(err);
				console.log(res);
				if (err) {
					dispatch(fetchWikiFail(err));
				} else {
					if (res.body.status === "success") {
						dispatch(fetchWikiSuccess(res.body.wiki, res.body.sections));
					} else {
						dispatch(fetchWikiFail(res.body.message));
					}
				}
			});
  	}
}


/*	 Editing wiki section   */ 
export function initializeWikiForm(title, content) {
	return { type: INITIALIZE_WIKI_FORM, title, content };
}

export function clickedSubmit() {
	return { type: CLICK_SUBMIT };
}
export function createSectionVersionSuccess() {
    return { type: CREATE_SECTION_VERSION_SUCCESS };
}
export function createSectionVersionFail(error) {
    return { type: CREATE_SECTION_VERSION_FAIL, error };
}
export function submitNewSectionVersion(wikiTitle, sectionIndex, sectionTitle, content) {
	return (dispatch) => {
		dispatch(clickedSubmit());

		request.put(ROOT_URL + '/wiki/section/version')
			.send({
				wikiTitle: wikiTitle,
				sectionIndex: sectionIndex,
				sectionTitle: sectionTitle,
				content: content
			})
			.use(bearer)
			.end(function(err, res) {
				// console.log(err);
				// console.log(res);
				if (err) {
					dispatch(createSectionVersionFail(err));
				} else {
					if (res.body.status === "success") {
						dispatch(createSectionVersionSuccess());
					} else {
						dispatch(createSectionVersionFail(res.body.message));
					}
				}
			});
	}
}