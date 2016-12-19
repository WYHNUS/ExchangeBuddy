export function showSnackbar(message){
  return { type: 'SHOW_SNACKBAR', message };
}

export function hideSnackbar(){
  return { type: 'HIDE_SNACKBAR' };
}
