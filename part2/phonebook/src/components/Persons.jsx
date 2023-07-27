import { deleteOne } from "../services/contact";

const Persons = ({ contacts, setPersons }) => {
  const deleteRecord = (val) => {
    deleteOne(val)
      .then(() => {
        const item = contacts.filter((value) => value.id !== val);
        setPersons(item);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      {contacts.map((val) => (
        <p key={val.id}>
          {val.name} {val.number}{" "}
          <button
            onClick={() => {
              const result = window.confirm(`Delete ${val.name} ?`);
              if (result) {
                deleteRecord(val.id);
              }
            }}
          >
            delete
          </button>
        </p>
      ))}
    </>
  );
};

export default Persons;
