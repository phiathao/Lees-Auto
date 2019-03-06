const viewReceiptReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VIEW_RECEIPTS':
      return action.payload;
    default:
      return state;
  }
};

export default viewReceiptReducer;
