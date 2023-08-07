const PersonForm = ({
  newContact,
  handleSubmit,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newContact.name} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input value={newContact.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
