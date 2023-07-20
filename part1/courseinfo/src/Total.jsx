const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce(
        (accumulator, currentVal) =>
          (accumulator = accumulator + currentVal.exercises),
        0
      )}
    </p>
  );
};

export default Total;
