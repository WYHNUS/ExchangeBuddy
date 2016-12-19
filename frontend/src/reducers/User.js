export default {

  'User/currentUser': function(state=null, action) {
    switch (action.type) {
      case 'User/SET_CURRENT_USER':
        return action.user;
      default:
        return state;
    }
  },

};
