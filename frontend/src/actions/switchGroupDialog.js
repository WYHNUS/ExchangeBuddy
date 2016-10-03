export const openSwitchGroupDialog = () => {
  return { type: 'SET_SWITCH_GROUP_DIALOG_OPEN', open: true };
};

export const closeSwitchGroupDialog = () => {
  return { type: 'SET_SWITCH_GROUP_DIALOG_OPEN', open: false };
};
