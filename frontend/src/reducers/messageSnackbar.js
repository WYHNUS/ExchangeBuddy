import {SHOW_SNACKBAR, HIDE_SNACKBAR} from '../actions/messageSnackbar';

//designing state shape
const initialState = {
  messageSnackbarOpen: false,
  messageSnackbarMessage: ""
}

export function messageSnackbar(state = initialState, action){
  switch(action.type){
    case SHOW_SNACKBAR:
    return Object.assign({}, state, {
      messageSnackbarOpen: true,
      messageSnackbarMessage: action.message
    })
    case HIDE_SNACKBAR:
    return Object.assign({}, state, {
      messageSnackbarOpen: false,
      messageSnackbarMessage: ""
    })
    default:
      return state;
  }

}
