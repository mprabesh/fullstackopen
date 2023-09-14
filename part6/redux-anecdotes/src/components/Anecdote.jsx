import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Filter from "./Filter";
import { addVote } from "../reducers/anecdoteReducer";
import Notification from "./Notification";
import {
  addNotification,
  removeNotificaton,
} from "../reducers/notificationReducer";

export default function Anecdote() {
  const anecdotes = useSelector((state) => {
    state = JSON.parse(JSON.stringify(state));
    return state.anecdote.sort((val1, val2) => {
      return val2.votes - val1.votes;
    });
  });

  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const filterQuery = useSelector((state) => state.filter);

  const anecdotesToShow = filterQuery
    ? anecdotes.filter((val) =>
        val.content.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : anecdotes;

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id));
    dispatch(addNotification(`You voted ${anecdote.content}`));
    setTimeout(() => dispatch(removeNotificaton()), 4000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification ? <Notification /> : <Filter />}
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
