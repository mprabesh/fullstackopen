import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addVoteAnecdote } from "../services/requests";
import { useDispatchNotification } from "../NotificationContext";

export default function Anecdote({ anecdotes }) {
  const dispatch = useDispatchNotification();

  const queryClient = useQueryClient();

  const addVoteMutation = useMutation(addVoteAnecdote, {
    onSuccess: (response) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((val) => (val.id === response.id ? response : val))
      );
    },
  });
  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    addVoteMutation.mutate(updatedAnecdote);
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: `anecdote "${anecdote.content}" voted!`,
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION" });
    }, 3000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
