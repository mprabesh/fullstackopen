import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const searchVal = event.target.value;
    dispatch({ type: "FILTER_ANECDOTE", payload: searchVal });
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
