import { useState } from "react";
import MyButton from "./Button";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8));
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const copyVote = [...votes];
  const updateVote = () => {
    copyVote[selected] += 1;
    setVote([...copyVote]);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>
        {anecdotes[selected]} <br />
        has {votes[selected]} votes
      </p>
      <MyButton myFunc={updateVote} text="vote" />
      <MyButton myFunc={newAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <p>
        {anecdotes[votes.indexOf(votes.reduce((a, b) => (a > b ? a : b)))]}
        <br />
        has {votes.reduce((a, b) => (a > b ? a : b))} votes
      </p>
    </div>
  );
};

export default App;
