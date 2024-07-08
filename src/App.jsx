import { useState } from "react";

function checkDuplicates(phoneBook, name) {
  const getAllNames = phoneBook.map(person => person.name);
  return !getAllNames.includes(name);
}

function App() {
  const [people, setPeople] = useState([
    { name: 'Aaron Smith' },
  ]);

  const [newName, setNewName] = useState('');

  const handleNewNameChange = (e) => setNewName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDuplicates(people, newName)) {
      alert(`${newName} Already Exists`);
      return;
    }
    setPeople([...people, { name: newName }]);
    setNewName('');
  }
  return <div>
    <h2>Phone Book</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Name : <input type="text" id="name" value={newName} onChange={handleNewNameChange} />
      </label>
      <button type="submit">Add</button>
    </form>
    <h2>Numbers</h2>
    <ol>
      {people.map(person => <li key={person.name}>{person.name}</li>)}
    </ol>
  </div>;
}

export default App
