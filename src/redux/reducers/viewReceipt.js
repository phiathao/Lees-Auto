const viewReceiptReducer = (
  state = {
    view_id: '',
    view_list: [],
  }, action
) => {
  switch (action.type) {
    case 'SET_VIEW_RECEIPT':
      return {...state, view_list: action.payload};
    case 'SET_VIEW_RECEIPT_ID':
    return {...state, view_id: action.payload};
    case 'CLEAR_VIEW_RECEIPT':
      return {...state, view_list: action.payload};;
    default:
      return state;
  }
};

export default viewReceiptReducer;
