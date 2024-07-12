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
    const findPerson = people.find(person => person.name === newName);
    if (findPerson && findPerson.number === newNumber) {
      alert(`${newName} Already Exists`);
      return false;
    } else if (findPerson) {
      const confirm = window.confirm(`${findPerson.name} Exists with a Different Number. Do you want to replace its phone number?`);
      if (!confirm) return false;
      phoneBook
        .replaceNumber(findPerson.id, { ...findPerson, number: newNumber })
        .then(newPerson => setPeople(people.map(person => person.id === newPerson.id ? newPerson : person)));
      return true;
    } else {
      phoneBook
        .create({ name: newName, number: newNumber })
        .then(newPerson => setPeople([...people, newPerson]));
      return true;
    }
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
