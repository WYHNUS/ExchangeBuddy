export function messageSnackbarOpen(state = false, action) {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return true;
    case 'HIDE_SNACKBAR':
      return false;
    default:
      return state;
  }
}

export function messageSnackbarMessage(state = "", action) {
  switch (action.type) {
    case 'SHOW_SNACKBAR':
      return action.message || "";
    case 'HIDE_SNACKBAR':
      return "";
    default:
      return state;
  }
}
