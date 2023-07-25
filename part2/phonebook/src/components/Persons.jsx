const Persons = ({ contacts }) => {
  return (
    <>
      {contacts.map((val) => (
        <p key={val.name}>
          {val.name} {val.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
