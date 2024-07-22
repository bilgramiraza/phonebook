import { useState } from "react";

function FilterForm({ changeFilter }) {

  const [newFilterName, setNewFilterName] = useState('');
  const [newFilterNumber, setNewFilterNumber] = useState('');

  const handleNewFilterNameChange = (e) => setNewFilterName(e.target.value);
  const handleNewFilterNumberChange = (e) => setNewFilterNumber(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeFilter(newFilterName, newFilterNumber);
  };

  const handleReset = (e) => {
    e.preventDefault();

    changeFilter('', '');

    setNewFilterName('');
    setNewFilterNumber('');
  };

  return (
    <div className="w-full p-1 flex flex-col border-b-2 border-black ">
      <h3 className="text-lg font-bold text-center">Filter Contacts</h3>
      <form onSubmit={handleSubmit} onReset={handleReset} className="my-2 w-full flex flex-col">
        <div className="w-full flex flex-row justify-around">
          <label className="w-2/5 px-3 flex flex-col">
            <span className="basis-2/3">Filter By Name </span>
            <input type="text" id="filterName" value={newFilterName} onChange={handleNewFilterNameChange} className="basis-3/5 border border-black border-3 rounded" />
          </label>
          <label className="w-2/5 px-3 flex flex-col">
            <span className="basis-2/3 ">Filter By Number</span>
            <input type="text" id="filterNumber" value={newFilterNumber} onChange={handleNewFilterNumberChange} className="basis-3/5 border border-black border-3 rounded" />
          </label>
        </div>
        <div className="w-full mt-3 flex flex-row justify-center">
          <button type="submit" className="px-8 py-1 border border-3 border-black rounded bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-700">Apply Filter</button>
          <button type="reset" className="px-8 py-1 border border-3 border-black rounded bg-gray-500 text-white hover:cursor-pointer hover:bg-gray-700">Clear Filter</button>
        </div>
      </form>
    </div>
  );
}

export default FilterForm;
