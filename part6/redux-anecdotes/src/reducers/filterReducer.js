import { createSlice } from "@reduxjs/toolkit";

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "FILTER_ANECDOTE":
//       return action.payload;
//     default:
//       return state;
//   }
// };

const filterSlice = createSlice({
  name: "filterAnecdote",
  initialState: "",
  reducers: {
    filterAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { filterAnecdote } = filterSlice.actions;
export default filterSlice.reducer;
