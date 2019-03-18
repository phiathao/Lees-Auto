const adminViewInfo = (state = 0, action) => {
    switch (action.type) {
      case 'INFO_TO_VIEW':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default adminViewInfo;