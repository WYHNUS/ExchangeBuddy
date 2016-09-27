export function switchGroupDialogOpen(state = "", action) {
  switch (action.type) {
    case 'SET_SWITCH_GROUP_DIALOG_OPEN':
      return action.open || false;
    default:
      return state;
  }
}
