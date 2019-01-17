const featureServicesReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_FEATURE':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default featureServicesReducer;