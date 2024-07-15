
function PhoneBookItem({ person, deletePerson }) {

  const handleDeletion = (personId) => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) deletePerson(personId);
  };

  return (
    <li>
      {person.name} : {person.number} <button onClick={() => handleDeletion(person.id)}>X</button>
    </li>
  );
}

function DisplayPhoneBook({ phoneBook, filter, deletePerson }) {

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
          filteredPhoneBook.map(person => <PhoneBookItem key={person.id} person={person} deletePerson={deletePerson} />)
        }
      </ol>
    </div>
  );
}

export default DisplayPhoneBook;
