import AnecdoteForm from "./components/AnecdoteForm";
import Anecdote from "./components/Anecdote";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializaAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializaAnecdotes());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Anecdote />
      <AnecdoteForm />
    </div>
  );
};

export default App;
