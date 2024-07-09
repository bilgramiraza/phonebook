import { useState } from "react";

function checkDuplicates(phoneBook, name) {
  const getAllNames = phoneBook.map(person => person.name);
  return !getAllNames.includes(name);
}

function App() {
  const [people, setPeople] = useState([
    { name: 'Aaron Smith', number: '12-345-6789', id: 0 },
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filterName, setFilterName] = useState('');
  const [filterNumber, setFilterNumber] = useState('');

  const handleNewNameChange = (e) => setNewName(e.target.value);
  const handleNewNumberChange = (e) => setNewNumber(e.target.value);

  const handleFilterNameChange = (e) => setFilterName(e.target.value);
  const handleFilterNumberChange = (e) => setFilterNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDuplicates(people, newName)) {
      alert(`${newName} Already Exists`);
      return;
    }
    setPeople([...people, { name: newName, number: newNumber, id: people.length + 1 }]);
    setNewName('');
    setNewNumber('');
  }

  const filteredPhoneBook = people.filter(({ name: personName, number: personNumber }) => {
    const nameFilter = personName.toLowerCase().includes(filterName.toLowerCase());
    const numberFilter = personNumber.includes(filterNumber);

    return nameFilter && numberFilter;
  });

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
      {filteredPhoneBook.map(person => <li key={person.id}>{person.name} : {person.number}</li>)}
    </ol>
    <form>
      <label>
        Filter By Name : <input type="text" id="filterName" value={filterName} onChange={handleFilterNameChange} />
      </label>
      <label>
        Filter By Number : <input type="text" id="filterNumber" value={filterNumber} onChange={handleFilterNumberChange} />
      </label>
    </form>
  </div>;
}

export default App
