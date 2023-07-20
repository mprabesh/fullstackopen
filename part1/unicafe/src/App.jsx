import { useState } from "react";
import Statistics from "./Statistics";

const Headers = ({ text }) => {
  return <h1>{text}</h1>;
};

const FeedbackButton = ({ changeFunc, text }) => {
  return <button onClick={changeFunc}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let checkFeedBack = good || neutral || bad;

  const addGood = () => {
    setGood(good + 1);
  };

  const addNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Headers text="give feedback" />

      <FeedbackButton changeFunc={addGood} text="good" />
      <FeedbackButton changeFunc={addNeutral} text="neutral" />
      <FeedbackButton changeFunc={addBad} text="bad" />

      <Headers text="statistics" />

      {checkFeedBack ? (
        <Statistics stats={{ good, neutral, bad }} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
