
function DisplayPhoneBook({ phoneBook, filter }) {

  const filteredPhoneBook = phoneBook.filter(({ name: personName, number: personNumber }) => {
    const nameFilter = personName.toLowerCase().includes(filter.name.toLowerCase());
    const numberFilter = personNumber.includes(filter.number);

    return nameFilter && numberFilter;
  });

  return (
    <div>
      <h3>Contact List</h3>
      <ol>
        {filteredPhoneBook.map(person => <li key={person.id}>{person.name} : {person.number}</li>)}
      </ol>
    </div>
  );
}

export default DisplayPhoneBook;
