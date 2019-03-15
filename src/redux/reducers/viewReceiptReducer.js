const viewReceiptReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIEW_RECEIPT':
      return action.payload;
    case 'EDIT_RECEIPT':
      return action.payload;
    case 'CLEAR_RECEIPT':
      return '';
    default:
      return state;
  }
};

export default viewReceiptReducer;
