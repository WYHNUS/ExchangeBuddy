export const showSnackbar = (message) => {
  return { type: 'SHOW_SNACKBAR', message };
};

export const hideSnackbar = (message) => {
  return { type: 'HIDE_SNACKBAR' };
};
