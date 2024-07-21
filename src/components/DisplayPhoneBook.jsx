
function PhoneBookItem({ person, deletePerson }) {

  const handleDeletion = (personId) => {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) deletePerson(personId);
  };

  return (
    <li className="w-4/5 mx-auto mt-2 ps-2 border border-2 border-gray-500 bg-gray-200 flex flex-col">
      <div className="flex flex-row justify-between">
        <span className="text-lg font-semibold">
          {person.name}
        </span>
        <div className="border border-black border-t-red-700 border-r-red-700 hover:border-t-red-500 hover:border-r-red-500 border-2">
          <button className="px-4 border-none bg-red-700 font-bold text-white hover:bg-red-500 hover:cursor-pointer" onClick={() => handleDeletion(person.id)}>X</button>
        </div>
      </div>
      <div className="w-5/6 mb-2 pt-1 border-t-2 border-gray-300">
        <span className="text-md italic">{person.number}</span>
      </div>
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
    <div className="w-1/2 pb-3 p-1 flex flex-col border-b-2 border-black">
      <h3 className="text-lg font-bold text-center">Contact List</h3>
      <ol>
        {
          filteredPhoneBook.map(person => <PhoneBookItem key={person.id} person={person} deletePerson={deletePerson} />)
        }
      </ol>
    </div>
  );
}

export default DisplayPhoneBook;
