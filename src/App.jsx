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
      handleNotification(`${newName} Already Exists`, false);
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
        .catch(error => {
          let errMsg = `Unable to change ${newName}'s Number in the DB`;
          if (error.response.status < 500) {
            errMsg = error.response.data.error;
          }
          handleNotification(errMsg, false);
        });
      return true;
    } else {
      phoneBook
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          setPeople([...people, newPerson]);
          handleNotification(`${newPerson.name} Added to the Phonebook`, true);
        })
        .catch(error => {
          let errMsg = `Unable to Add ${newName} to the DB`;
          if (error.response.status < 500) {
            errMsg = error.response.data.error;
          }
          handleNotification(errMsg, false);
        });
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
      .then(() => {
        const deletedPerson = people.find(person => person.id === personId);
        setPeople(people => people.filter(p => p.id !== personId));
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

  return (
    <div className="w-full lg:w-1/2 lg:mx-auto ps-2 flex flex-col relative">
      <h2 className="w-full my-3 text-2xl font-bold text-center underline">Phone Book</h2>
      <Notification message={notification.message} status={notification.status} />
      <PhoneBookForm submitNewPerson={handleNewPerson} />
      <FilterForm changeFilter={handleFilter} />
      <DisplayPhoneBook phoneBook={people} filter={filter} deletePerson={handleDeletion} />
    </div>
  );
}

export default App;
