export default {
  'HomeSearchDrawer/isOpen'(state = false, { type, isOpen }) {
    switch (type) {
      case 'TOGGLE_HOME_SEARCH_DRAWER':
        return isOpen;
      default:
        return state;
    }
  }
}
