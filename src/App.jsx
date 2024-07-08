import { useState } from "react";

function App() {
  const [people, setPeople] = useState([
    { name: 'Aaron Smith' }
  ]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Not yet Implemented');
  }
  return <div>
    <h2>Phone Book</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Name : <input type="text" id="name" />
      </label>
      <button type="submit">Add</button>
    </form>
    <h2>Numbers</h2>
    <ul>
      {people.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
  </div>;
}

export default App
