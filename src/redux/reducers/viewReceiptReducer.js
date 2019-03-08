const viewReceiptReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VIEW_RECEIPTS':
      return action.payload;
    case 'CLEAR_CUSTOMER':
      return [];
    default:
      return state;
  }
};

export default viewReceiptReducer;
