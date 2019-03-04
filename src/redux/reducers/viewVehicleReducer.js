const viewCustomerReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIEW_VEHICLE':
      return action.payload;
    case 'EDIT_VEHICLE':
      return action.payload;
    default:
      return state;
  }
};

export default viewCustomerReducer;
