import { useState } from "react";

function PhoneBookForm({ submitNewPerson }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitNewPerson(name, number)) return;

    setName('');
    setNumber('');
  }

  return (
    <div>
      <h3>Add a New Contact</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name : <input type="text" id="name" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Number : <input type="tel" id="number" value={number} onChange={handleNumberChange} />
        </label>
        <button type="submit" disabled={!(number && name)}>Add</button>
      </form>
    </div>
  );
}

export default PhoneBookForm;
