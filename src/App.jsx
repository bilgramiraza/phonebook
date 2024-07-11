import { useEffect, useState } from "react";
import PhoneBookForm from "./components/PhoneBookForm";
import FilterForm from "./components/FilterForm";
import DisplayPhoneBook from "./components/DisplayPhoneBook";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPeople(response.data);
      })
  }, []);

  const [filter, setFilter] = useState({
    name: '',
    number: '',
  });

  const handleNewPerson = (newName, newNumber) => {
    const getAllNames = people.map(person => person.name);
    if (getAllNames.includes(newName)) {
      alert(`${newName} Already Exists`);
      return false;
    }
    setPeople([...people, { name: newName, number: newNumber, id: people.length + 1 }]);
    return true;
  };

  const handleFilter = (newNameFilter, newNumberFilter) => {
    setFilter({
      name: newNameFilter,
      number: newNumberFilter,
    });
  };

  return <div>
    <h2>Phone Book</h2>
    <PhoneBookForm submitNewPerson={handleNewPerson} />
    <FilterForm changeFilter={handleFilter} />
    <DisplayPhoneBook phoneBook={people} filter={filter} />
  </div>;
}

export default App;
