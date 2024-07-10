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
    <div>
      <h3>Filter Contacts</h3>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <label>
          Filter By Name : <input type="text" id="filterName" value={newFilterName} onChange={handleNewFilterNameChange} />
        </label>
        <label>
          Filter By Number : <input type="text" id="filterNumber" value={newFilterNumber} onChange={handleNewFilterNumberChange} />
        </label>
        <button type="submit">Apply Filter</button>
        <button type="reset">Clear Filter</button>
      </form>
    </div>
  );
}

export default FilterForm;
