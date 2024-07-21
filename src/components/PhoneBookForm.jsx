import { useState } from "react";

function PhoneBookForm({ submitNewPerson }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submitNewPerson(name, number)) return;

    setName('');
    setNumber('');
  }

  return (
    <div className="w-1/2 p-1 flex flex-col border-b-2 border-black ">
      <h3 className="text-lg font-bold text-center">Add a New Contact</h3>
      <form onSubmit={handleSubmit} className="my-2 w-full flex flex-col">
        <div className="w-full flex flex-row justify-between">
          <label className="w-1/2 flex flex-row justify-start">
            <span className="basis-1/6 text-end px-3">Name </span>
            <input type="text" id="name" value={name} onChange={handleNameChange} className="basis-3/5 border border-black border-3 rounded" />
          </label>
          <label className="w-1/2 flex flex-row justify-end">
            <span className="basis-1/6 text-end px-3">Number </span>
            <input type="tel" id="number" value={number} onChange={handleNumberChange} className="basis-2/5 border border-black border-3 rounded" />
          </label>
        </div>
        <div className="w-full mx-auto mt-2 flex flex-row justify-center">
          <button type="submit" disabled={!(number && name)} className="w-1/4 py-1 border border-black rounded bg-green-500 text-lg hover:cursor-pointer hover:bg-green-300">Add</button>
        </div>
      </form>
    </div>
  );
}

export default PhoneBookForm;
