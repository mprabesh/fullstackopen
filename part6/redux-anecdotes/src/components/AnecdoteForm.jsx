import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const newAnecdote = { content: e.target.newVal.value, votes: 0 };
    dispatch(createAnecdote(newAnecdote));
    e.target.newVal.value = "";
    dispatch(displayNotification(`You added "${newAnecdote.content}"`, 4));
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
