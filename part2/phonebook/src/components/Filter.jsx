const Filter = ({ setFilterVal }) => {
  const handleChange = (e) => {
    setFilterVal(e.target.value);
  };
  return (
    <div>
      filter shown with: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
