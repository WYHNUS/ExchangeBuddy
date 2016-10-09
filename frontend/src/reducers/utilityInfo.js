import {FETCH_ALL_UNIVERSITY} from '../actions/utilityInfo';

//designing state shape
const initialState = {
  universities: []
}

function utilityInfo(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_UNIVERSITY:
      return Object.assign({}, state, {
        // universities: action.universities
      })
    default:
      return state
  }
}