const customerVehiclesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_VEHICLES':
      return action.payload;
    default:
      return state;
  }
};

export default customerVehiclesReducer;
