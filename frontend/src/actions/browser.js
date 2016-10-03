export const RESIZE_BROWSER_WINDOW = 'RESIZE_BROWSER_WINDOW';

export const resizeBrowserWindow = (windowWidth) => {
  return { type: RESIZE_BROWSER_WINDOW, windowWidth };
};
