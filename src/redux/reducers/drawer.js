const drawerReducer = (state = 1, action) => {
  switch (action.type) {
    case 'SET_DRAWER_APPOINTMENT':
      return 1;
    case 'SET_DRAWER_CUSTOMER':
      return 2;
    case 'SET_DRAWER_SERVICE':
      return 3;
    case 'SET_DRAWER_SALES':
      return 4;
    case 'SET_DRAWER_INCOME':
      return 5;
    default:
      return state;
  }
};

export default drawerReducer;
