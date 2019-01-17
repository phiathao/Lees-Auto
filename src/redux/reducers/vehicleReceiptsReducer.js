const vehicleReceiptsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VEHICLE_RECEIPTS':
      return action.payload;
    default:
      return state;
  }
};

export default vehicleReceiptsReducer;
