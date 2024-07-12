import phoneBook from "../services/phoneBook";

function PhoneBookItem({ person, setPhoneBook }) {

  const deletePerson = (personId, setPhoneBook) => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      phoneBook
        .remove(personId)
        .then(deletedPerson => setPhoneBook(people => people.filter(p => p.id !== deletedPerson.id)));
    }
  };

  return (
    <li>
      {person.name} : {person.number} <button onClick={() => deletePerson(person.id, setPhoneBook)}>X</button>
    </li>
  );
}

function DisplayPhoneBook({ phoneBook, filter, setPhoneBook }) {

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
          filteredPhoneBook.map(person => <PhoneBookItem key={person.id} person={person} setPhoneBook={setPhoneBook} />)
        }
      </ol>
    </div>
  );
}

export default DisplayPhoneBook;
