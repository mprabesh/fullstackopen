import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const postAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

export const addVoteAPI = async (updateAnecdote) => {
  const reponse = await axios.put(
    `${baseUrl}/${updateAnecdote.id}`,
    updateAnecdote
  );
  return reponse.data;
};
