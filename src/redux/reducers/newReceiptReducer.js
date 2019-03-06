const emptyState = {
  vehicle_id: '',
  payment_method: '',
  description: '',
  due: '',
  services: []
}

const newReceiptReducer = (state = emptyState, action) => {
  switch (action.type) {
    case 'SET_NEW_RECEIPT':
      return action.payload;
    case 'CLEAR_NEW_RECEIPT':
      return emptyState;
    default:
      return state;
  }
};

export default newReceiptReducer;
