import { useEffect, useState } from "react";
import PhoneBookForm from "./components/PhoneBookForm";
import FilterForm from "./components/FilterForm";
import DisplayPhoneBook from "./components/DisplayPhoneBook";
import phoneBook from "./services/phoneBook";
import Notification from "./components/Notification";

function App() {
  const [people, setPeople] = useState([]);
  const [notification, setNotification] = useState({
    message: '',
    status: '',
  });

  useEffect(() => {
    phoneBook
      .getAll()
      .then(peopleList => {
        setPeople(peopleList);
      })
      .catch(() => handleNotification("Unable to get List of Contacts", false));
  }, []);

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
        .then(newPerson => {
          setPeople(people.map(person => person.id === newPerson.id ? newPerson : person));
          handleNotification(`${newPerson.name} Added to the Phonebook`, true);
        })
        .catch(() => handleNotification("Unable to Add Contact to the DB", false));
      return true;
    } else {
      phoneBook
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          setPeople([...people, newPerson]);
          handleNotification(`${newPerson.name} Added to the Phonebook`, true);
        })
        .catch(() => handleNotification("Unable to Add Contact to the DB", false));
      return true;
    }
  };

  const handleFilter = (newNameFilter, newNumberFilter) => {
    setFilter({
      name: newNameFilter,
      number: newNumberFilter,
    });
  };

  const handleNotification = (message, status) => {
    setNotification({ message, status });
    setTimeout(() => setNotification(notif => ({ ...notif, message: '' })), 5000);
  };

  return (
    <div>
      <Notification message={notification.message} status={notification.status} />
      <h2>Phone Book</h2>
      <PhoneBookForm submitNewPerson={handleNewPerson} />
      <FilterForm changeFilter={handleFilter} />
      <DisplayPhoneBook phoneBook={people} filter={filter} setPhoneBook={setPeople} />
    </div>
  );
}

export default App;
