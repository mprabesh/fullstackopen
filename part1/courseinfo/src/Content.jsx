const Content = ({ content }) => {
  return (
    <div>
      {content.map((value) => (
        <p key={value.name}>
          {value.name} {value.exercises}
        </p>
      ))}
    </div>
  );
};

export default Content;
