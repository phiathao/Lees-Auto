const adminViewInfo = (state = {
  view: 0,
  viewMore: false,
}, action) => {
    switch (action.type) {
      case 'INFO_TO_VIEW':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default adminViewInfo;