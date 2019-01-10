const viewCustomerReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIEW_CUSTOMER':
      return action.payload;
    default:
      return state;
  }
};

export default viewCustomerReducer;
