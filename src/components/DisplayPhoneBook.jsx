import phoneBook from "../services/phoneBook";

function PhoneBookItem({ person, handleRefresh }) {

  const deletePerson = (person, handleRefresh) => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      phoneBook
        .remove(person.id)
        .then(handleRefresh(true));
    }
  };

  return (
    <li>
      {person.name} : {person.number} <button onClick={() => deletePerson(person, handleRefresh)}>X</button>
    </li>
  );
}

function DisplayPhoneBook({ phoneBook, filter, handleRefresh }) {

  const filteredPhoneBook = phoneBook.filter(({ name: personName, number: personNumber }) => {
    const nameFilter = personName.toLowerCase().includes(filter.name.toLowerCase());
    const numberFilter = personNumber.includes(filter.number);

    return nameFilter && numberFilter;
  });

  return (
    <div>
      <h3>Contact List</h3>
      <ol>
        {
          filteredPhoneBook.map(person => <PhoneBookItem key={person.id} person={person} handleRefresh={handleRefresh} />)
        }
      </ol>
    </div>
  );
}

export default DisplayPhoneBook;
