const customersData = (state = [], action) => {
  switch (action.type) {
    case 'SET_VEHICLES_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default customersData;