const emptyState = {
  first_name: '',
  last_name: '',
  phone: '',
  street: '',
  city: '',
  zip: '',
  state: '',
}

const newCustomerReducer = (state = emptyState, action) => {
  switch (action.type) {
    case 'SET_NEW_CUSTOMER':
      return action.payload;
    case 'CLEAR_NEW_CUSTOMER':
      return {};
    default:
      return state;
  }
};

export default newCustomerReducer;
