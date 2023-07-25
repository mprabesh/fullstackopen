import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Prabesh", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  ]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [filterName, setFilterName] = useState("");

  const checkValues = persons.find(
    (val) => val.name.toLowerCase() === newContact.name.toLowerCase()
  );
  const setFilterVal = (val) => {
    setFilterName(val);
  };
  const contactsToShow = persons.filter((value) => {
    return filterName.length === 0
      ? true
      : value.name.toLowerCase() === filterName.toLowerCase();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    checkValues === undefined
      ? setPersons(
          persons.concat({
            name: newContact.name,
            number: newContact.number,
            id: persons.length + 1,
          })
        )
      : alert(`${newContact.name} is already included in the phonebook`);

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
      <Filter setFilterVal={setFilterVal} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newContact={newContact}
      />
      <h2>Numbers</h2>
      <Persons contacts={contactsToShow} />
    </div>
  );
};

export default App;
