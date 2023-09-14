import React from "react";
import { useDispatch } from "react-redux";

export default function AnecdoteForm() {
  const dispatch = useDispatch();
  const addAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.newVal.value;
    dispatch({ type: "ADD_ANECDOTE", payload: newAnecdote });
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newVal" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}
