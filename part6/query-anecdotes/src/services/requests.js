import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const postAnecdotes = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

export const addVoteAnecdote = async (updateAnecdote) => {
  const response = await axios.put(
    `${baseUrl}/${updateAnecdote.id}`,
    updateAnecdote
  );

  return response.data;
};
