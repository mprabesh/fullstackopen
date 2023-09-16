import { createSlice } from "@reduxjs/toolkit";
import { getAll, postAnecdote, addVoteAPI } from "../services/anecdotes";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);
const initialState = [];

const anecdoteSlice = createSlice({
  name: "filterAnecdote",
  initialState,
  reducers: {
    addVote(state, action) {
      return state.map((val) =>
        val.id === action.payload.id ? action.payload : val
      );
    },
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_ANECDOTE":
//       const newAnecdote = asObject(action.payload);
//       return [...state, newAnecdote];
//     case "ADD_VOTE":
//       return state.map((value) =>
//         value.id === action.payload
//           ? { ...value, votes: value.votes + 1 }
//           : value
//       );
//     default:
//       return state;
//   }
// };

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializaAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await postAnecdote(content);
    dispatch(appendAnecdote(response));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const response = await addVoteAPI(anecdote);
    console.log(response);
    dispatch(addVote(response));
  };
};
