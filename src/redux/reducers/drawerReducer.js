const drawerReducer = (state = 0, action) => {
  switch (action.type) {
    case 'SET_DRAWER_BACK':
      return 0;
    case 'SET_DRAWER_APPOINTMENTS':
      return 1;
    case 'SET_DRAWER_CUSTOMERS':
      return 2;
    case 'SET_DRAWER_SERVICES':
      return 3;
    case 'SET_DRAWER_SALES':
      return 4;
    case 'SET_DRAWER_INCOMES':
      return 5;
    case 'SET_DRAWER_VIEW_VEHICLE':
      return 6;
    case 'SET_DRAWER_VIEW_CUSTOMER':
      return 7;
    default:
      return state;
  }
};

export default drawerReducer;
