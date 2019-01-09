const dataInfo = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default dataInfo;