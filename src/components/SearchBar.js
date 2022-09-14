import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { MdOutlineClear, MdOutlineSearch } from 'react-icons/md';

const SearchBar = ({ placeholder, onClick }) => {
  const [filteredVideoList, setFilteredVideoList] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const getSearch = useCallback(debounce(async (searchWord) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/search/?search_query=${searchWord}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const results = await response.json();
    setFilteredVideoList(searchWord === '' ? [] : results);
  }, 1000),
    []
  );

  const handleChange = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    getSearch(searchWord);
  };

  const clearInput = () => {
    setFilteredVideoList([]);
    setWordEntered('');
  };

  return (
    <div class='search'>
      <div class='searchInputs'>
        <input
          data-testid='word-input'
          type='text'
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleChange}
        />
        <div class='searchIcon'>
          {filteredVideoList.length === 0 ? (
            <MdOutlineSearch id='searchButton' />
          ) : (
            <MdOutlineClear id='closeButton' onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredVideoList.length !== 0 && (
        <div class='dataResult'>
          {filteredVideoList.slice(0, 5).map((video) => (
            <a
              key={video.index}
              class='dataItem'
              ref={() => false}
              target={video.id_videoId}
              onClick={onClick}
              href='/#'
            >
              {video.id_name.replaceAll('&#39;', "'")}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
