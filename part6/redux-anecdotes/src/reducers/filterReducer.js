const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER_ANECDOTE":
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
