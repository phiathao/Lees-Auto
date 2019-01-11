

const editCustomerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDIT_CUSTOMER':
      return action.payload;
    case 'EDIT_CUSTOMER':
      return action.payload;
    default:
      return state;
  }
};

export default editCustomerReducer;
