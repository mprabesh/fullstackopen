import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { getAll, create, update } from "./services/contact";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [filterName, setFilterName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    messageTypeError: false,
  });
  // -->> to get all the list of contacts from the db at once
  useEffect(() => {
    getAll()
      .then((response) => setPersons(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // -->> To check if the contact is already in the db.
  const checkValues = persons.find(
    (val) => val.name.toLowerCase() === newContact.name.toLowerCase()
  );
  // -->> filter method
  const setFilterVal = (val) => {
    setFilterName(val);
  };
  //-->> filter to show contact list
  const contactsToShow = persons.filter((value) => {
    return filterName.length === 0
      ? true
      : value.name.toLowerCase().includes(filterName.toLowerCase());
  });
  // -->> update the numberField method
  const updateNumberField = (updateObj) => {
    const result = window.confirm(
      `${updateObj.name} is already added to phonebook, replace the old number with new one?`
    );
    //add to update the number
    if (result) {
      const updatedContact = { ...updateObj, number: newContact.number };
      const updatePromise = update(updateObj.id, updatedContact);
      updatePromise
        .then(() => {
          setPersons(
            persons.map((val) =>
              val.id !== updateObj.id
                ? val
                : { ...val, number: newContact.number }
            )
          );
          setNotificationMessage({
            ...notificationMessage,
            message: `Updated ${updateObj.name}`,
          });
          setTimeout(() => {
            setNotificationMessage({ messageTypeError: false, message: "" });
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          setNotificationMessage({
            message: err.response.data.error,
            messageTypeError: true,
          });
          setTimeout(() => {
            setNotificationMessage({ messageTypeError: false, message: "" });
          }, 3000);
        });
    }
  };
  const handleSubmit = () => {
    checkValues === undefined
      ? create({
          name: newContact.name,
          number: newContact.number,
        })
          .then((response) => {
            setPersons([...persons, response.data]);
            setNotificationMessage({
              messageTypeError: false,
              message: `Added ${newContact.name}`,
            });
            setTimeout(() => {
              setNotificationMessage({ messageTypeError: false, message: "" });
            }, 3000);
          })
          .catch((err) => {
            console.dir(err.response.data.error);
            setNotificationMessage({
              message: err.response.data.error,
              messageTypeError: true,
            });
            setTimeout(() => {
              setNotificationMessage({
                message: "",
                messageTypeError: false,
              });
            }, 3000);
          })
      : updateNumberField(checkValues); // -->> if alrady in the db then just ask for update in number field
    setNewContact({ name: "", number: "" });
  };
  const handleNameChange = (e) => {
    setNewContact({ ...newContact, name: e.target.value });
  };
  const handleNumberChange = (e) => {
    setNewContact({ ...newContact, number: e.target.value });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        notificationMessage={notificationMessage}
        setNotificationMessage={setNotificationMessage}
      />

      <Filter setFilterVal={setFilterVal} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newContact={newContact}
      />
      <h2>Numbers</h2>
      <Persons
        contacts={contactsToShow}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  );
};

export default App;
