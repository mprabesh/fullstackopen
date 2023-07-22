const MyButton = ({ myFunc, text }) => {
  return <button onClick={myFunc}>{text}</button>;
};

export default MyButton;
