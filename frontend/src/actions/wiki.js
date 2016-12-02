import request from 'superagent';
import cookie from 'react-cookie';
import { bearer } from '../util/bearer';
import { ROOT_URL } from '../util/backend';

export const INITIALIZE_WIKI_FORM = 'INITIALIZE_WIKI_FORM';

export const CLICK_SUBMIT = 'CLICK_SUBMIT';
export const CREATE_SECTION_VERSION_SUCCESS = 'CREATE_SECTION_VERSION_SUCCESS';
export const CREATE_SECTION_VERSION_FAIL = 'CREATE_SECTION_VERSION_FAIL';

export const CREATE_NEW_SECTION_SUCCESS = 'CREATE_NEW_SECTION_SUCCESS';
export const CREATE_NEW_SECTION_FAIL = 'CREATE_NEW_SECTION_FAIL';

export const FECTCH_WIKI_PAGE = 'FECTCH_WIKI_PAGE';
export const FECTCH_WIKI_PAGE_SUCCESS = 'FECTCH_WIKI_PAGE_SUCCESS';
export const FECTCH_WIKI_PAGE_FAIL = 'FECTCH_WIKI_PAGE_FAIL';

export const FECTCH_RECOMMENDATION_SUCCESS = 'FECTCH_RECOMMENDATION_SUCCESS';
export const FECTCH_RECOMMENDATION_FAIL = 'FECTCH_RECOMMENDATION_FAIL';


export function clickedFetch() {
    return { type: FECTCH_WIKI_PAGE };
}

/*  Get all wiki recommendation */
export function fetchRecommendationSuccess(wiki, allWikis) {
    return { type: FECTCH_RECOMMENDATION_SUCCESS, wiki, allWikis };
}
export function fetchRecommendationFail(error) {
    return { type: FECTCH_RECOMMENDATION_FAIL, error };
}
function handleRecommendationRes(dispatch, err, res) {
  // console.log(err);
  // console.log(res);
  if (err) {
    dispatch(fetchRecommendationFail(err));
  } else {
    if (res.body.status === 'success') {
      dispatch(fetchRecommendationSuccess(res.body.wiki, res.body.allWikis));
    } else {
      dispatch(fetchRecommendationFail(res.body.message));
    }
  }
}
export function fetchRecommendation() {
  return (dispatch) => {
      dispatch(clickedFetch());

      if (cookie.load('authToken')) {
        request.get(ROOT_URL + '/wikiCustomizedRecommend')
        .use(bearer)
          .end(function(err, res) {
            handleRecommendationRes(dispatch, err, res)
        });
      } else {
        request.get(ROOT_URL + '/wikiRecommend')
          .end(function(err, res) {
            handleRecommendationRes(dispatch, err, res)
        });
      }
    }
}

/*  Get one wiki page   */
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
      if (additionalParam) {
        query += ('&param=' + JSON.stringify(additionalParam));
      }
      request.get(ROOT_URL + '/wiki')
        .query(query)
        .end(function(err, res) {
        // console.log(err);
        // console.log(res);
        if (err) {
          dispatch(fetchWikiFail(err));
        } else {
          if (res.body.status === 'success') {
            dispatch(fetchWikiSuccess(res.body.wiki, res.body.sections));
          } else {
            dispatch(fetchWikiFail(res.body.message));
          }
        }
      });
    }
}


/*   Create new wiki section  */
export function clickedSubmit() {
  return { type: CLICK_SUBMIT };
}
export function createNewSectionSuccess() {
    return { type: CREATE_NEW_SECTION_SUCCESS };
}
export function createNewSectionFail(error) {
    return { type: CREATE_NEW_SECTION_FAIL, error };
}
export function submitNewSection(wikiTitle, versionTitle, content) {
  return (dispatch) => {
    dispatch(clickedSubmit());

    request.put(ROOT_URL + '/wiki/section')
      .send({
        wikiTitle: wikiTitle,
        versionTitle: versionTitle,
        content: content
      })
      .use(bearer)
      .end(function(err, res) {
        // console.log(err);
        // console.log(res);
        if (err) {
          dispatch(createNewSectionFail(err));
        } else {
          if (res.body.status === 'success') {
            dispatch(createNewSectionSuccess());
          } else {
            dispatch(createNewSectionFail(res.body.message));
          }
        }
      });
  }
}


/*   Editing wiki section   */ 
export function initializeWikiForm(title, content) {
  return { type: INITIALIZE_WIKI_FORM, title, content };
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
          if (res.body.status === 'success') {
            dispatch(createSectionVersionSuccess());
          } else {
            dispatch(createSectionVersionFail(res.body.message));
          }
        }
      });
  }
}