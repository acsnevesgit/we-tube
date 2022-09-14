import React, { useState } from 'react';
import { MdOutlineClear, MdOutlineSearch } from 'react-icons/md';

const SearchBar = ({ data, placeholder, onClick, onKeyPress }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  console.log(filteredData)

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
        <input type='text' placeholder={placeholder} value={wordEntered} onChange={handleFilter} newData={filteredData} onKeyPress={onKeyPress}
        />
        <div class='searchIcon'>
          {/* //TODO */}
          {filteredData.length === 0 ? (<MdOutlineSearch id='searchButton' />) : (<MdOutlineClear id='closeButton' onClick={clearInput} />)}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div class='dataResult'>
          {filteredData.map((value) => {
            return (
              <a class='dataItem' key={value.videoName} onClick={onClick} href=''>
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