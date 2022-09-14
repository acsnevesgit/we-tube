import React, { useState } from 'react';
import { MdOutlineClear, MdOutlineSearch } from 'react-icons/md';

const SearchBar = ({ data, placeholder, onClick }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.videoName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  return (
    <div class='search'>
      <div class='searchInputs'>
        <input type='text' placeholder={placeholder} value={wordEntered} onChange={handleFilter}
        />
        <div class='searchIcon'>
          {filteredData.length === 0 ? (<MdOutlineSearch id='searchButton' />) : (<MdOutlineClear id='closeButton' onClick={clearInput} />)}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div class='dataResult'>
          {filteredData.map((value) => {
            return (
              <a class='dataItem' key={value.videoName} onClick={onClick}>
                {value.videoName}
              </a>
            );
          })}
        </div>
      )}
    </div >
  )
};

export default SearchBar;