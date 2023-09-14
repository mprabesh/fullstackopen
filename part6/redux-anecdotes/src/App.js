import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => {
    return state.sort((val1, val2) => {
      return val2.votes - val1.votes;
    });
  });
  const dispatch = useDispatch();
  const addAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.newVal.value;
    dispatch({ type: "ADD_ANECDOTE", payload: newAnecdote });
  };
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newVal" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
