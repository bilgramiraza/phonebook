import { useEffect, useState } from "react";
import PhoneBookForm from "./components/PhoneBookForm";
import FilterForm from "./components/FilterForm";
import DisplayPhoneBook from "./components/DisplayPhoneBook";
import phoneBook from "./services/phoneBook";

function App() {
  const [people, setPeople] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    phoneBook
      .getAll()
      .then(peopleList => {
        setPeople(peopleList);
      })
    setRefresh(false);
  }, [refresh]);

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
    phoneBook
      .create({ name: newName, number: newNumber })
      .then(newPerson => setPeople([...people, newPerson]));

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
    <DisplayPhoneBook phoneBook={people} filter={filter} handleRefresh={setRefresh} />
  </div>;
}

export default App;
