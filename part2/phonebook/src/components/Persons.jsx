import { deleteOne } from "../services/contact";

const Persons = ({ contacts, setPersons, setNotificationMessage }) => {
  const deleteRecord = (val) => {
    deleteOne(val)
      .then(() => {
        const item = contacts.filter((value) => value.id !== val);
        setPersons(item);
        setNotificationMessage({
          message: `Deleted.`,
          messageTypeError: false,
        });
        setTimeout(() => {
          setNotificationMessage({
            message: "",
            messageTypeError: false,
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
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
