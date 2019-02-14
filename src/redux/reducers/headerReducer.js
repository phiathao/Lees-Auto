const headerReducer = (state = 0, action) => {
    switch (action.type) {
      case 'SET_HEADER':
        return action.payload;
      default:
        return state;
    }
  };

  export default headerReducer;
  