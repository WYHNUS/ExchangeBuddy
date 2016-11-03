import request from 'superagent';
import { ROOT_URL } from '../util/backend';

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

export function fetchWikiPage(wikiTitle) {
	return (dispatch) => {
	    dispatch(clickedFetch());

	    request.get(ROOT_URL + '/wiki')
	    	.query('q='+wikiTitle)
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
