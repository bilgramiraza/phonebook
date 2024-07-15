import { useEffect, useState } from "react";
import PhoneBookForm from "./components/PhoneBookForm";
import FilterForm from "./components/FilterForm";
import DisplayPhoneBook from "./components/DisplayPhoneBook";
import phoneBook from "./services/phoneBook";
import Notification from "./components/Notification";

function App() {
  const [people, setPeople] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    status: false,
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
          handleNotification(`${newPerson.name}'s Number changed in the Phonebook`, true);
        })
        .catch(() => handleNotification(`Unable to change ${newName}'s Number in the DB`, false));
      return true;
    } else {
      phoneBook
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          setPeople([...people, newPerson]);
          handleNotification(`${newPerson.name} Added to the Phonebook`, true);
        })
        .catch(() => handleNotification(`Unable to Add ${newName} to the DB`, false));
      return true;
    }
  };

  const handleFilter = (newNameFilter, newNumberFilter) => {
    setFilter({
      name: newNameFilter,
      number: newNumberFilter,
    });
  };

  const handleDeletion = (personId) => {
    phoneBook
      .remove(personId)
      .then(deletedPerson => {
        setPeople(people => people.filter(p => p.id !== deletedPerson.id));
        handleNotification(`${deletedPerson.name} Deleted`, true);
      })
      .catch(() => {
        const deletedPerson = people.find(person => person.id === personId);
        handleNotification(`Could not delete ${deletedPerson.name} from the DB`, false);
      });
  };

  const handleNotification = (message, status) => {
    setNotification({ message, status });
    setTimeout(() => setNotification(notif => ({ ...notif, message: '' })), 5000);
  };

  if (!people)
    return null;

  return (
    <div>
      <Notification message={notification.message} status={notification.status} />
      <h2>Phone Book</h2>
      <PhoneBookForm submitNewPerson={handleNewPerson} />
      <FilterForm changeFilter={handleFilter} />
      <DisplayPhoneBook phoneBook={people} filter={filter} deletePerson={handleDeletion} />
    </div>
  );
}

export default App;
