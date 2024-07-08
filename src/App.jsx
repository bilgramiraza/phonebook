import { useState } from "react";

function checkDuplicates(phoneBook, name) {
  const getAllNames = phoneBook.map(person => person.name);
  return !getAllNames.includes(name);
}

function App() {
  const [people, setPeople] = useState([
    {
      name: 'Aaron Smith',
      number: '12-345-6789',
    },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNewNameChange = (e) => setNewName(e.target.value);

  const handleNewNumberChange = (e) => setNewNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDuplicates(people, newName)) {
      alert(`${newName} Already Exists`);
      return;
    }
    setPeople([...people, { name: newName, number: newNumber }]);
    setNewName('');
    setNewNumber('');
  }
  return <div>
    <h2>Phone Book</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Name : <input type="text" id="name" value={newName} onChange={handleNewNameChange} />
      </label>
      <label>
        Number : <input type="tel" id="number" value={newNumber} onChange={handleNewNumberChange} />
      </label>
      <button type="submit" disabled={!(newNumber && newName)}>Add</button>
    </form>
    <h2>Numbers</h2>
    <ol>
      {people.map(person => <li key={person.name}>{person.name} : {person.number}</li>)}
    </ol>
  </div>;
}

export default App
