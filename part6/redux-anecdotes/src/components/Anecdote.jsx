import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Anecdote() {
  const anecdotes = useSelector((state) => {
    return state.sort((val1, val2) => {
      return val2.votes - val1.votes;
    });
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({ type: "ADD_VOTE", payload: id });
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
