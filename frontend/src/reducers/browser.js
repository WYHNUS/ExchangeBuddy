export function browserIsMobileWidth(state = false, { type, windowWidth }) {
  switch (type) {
    case 'RESIZE_BROWSER_WINDOW':
      return windowWidth < 768;
    default:
      return state;
  }
}
