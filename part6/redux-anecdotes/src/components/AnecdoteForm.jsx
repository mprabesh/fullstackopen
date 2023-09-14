import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  addNotification,
  removeNotificaton,
} from "../reducers/notificationReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.newVal.value;
    dispatch(createAnecdote(newAnecdote));
    e.target.newVal.value = "";
    dispatch(addNotification(`You added "${newAnecdote}"`));
    setTimeout(() => dispatch(removeNotificaton()), 4000);
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
