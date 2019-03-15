const emptyState = {
  make: '',
  model: '',
  year: '',
  plate: '',
  color: '',
  other: '',
  vin: '',
  odometer: '',
  customer_id: '',
}

const newVehicleReducer = (state = emptyState, action) => {
  switch (action.type) {
    case 'SET_NEW_VEHICLE':
      return action.payload;
    case 'CLEAR_NEW_VEHICLE':
      return emptyState;
    default:
      return state;
  }
};

export default newVehicleReducer;
