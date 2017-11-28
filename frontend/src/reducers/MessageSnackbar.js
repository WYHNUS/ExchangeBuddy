export default {
  'MessageSnackbar/message'(state = '', { type, message }) {
    switch (type) {
      case 'SHOW_SNACKBAR':
        return message;
      default:
        return state;
    }
  },
  'MessageSnackbar/isOpen'(state = false, { type }) {
    switch (type) {
      case 'SHOW_SNACKBAR':
        return true;
      case 'HIDE_SNACKBAR':
        return false;
      default:
        return state;
    }
  },
}
