import React, { useState } from 'react';
import Fuse from 'fuse.js';

/**
 * SearchBar component represents an input field for searching within the application.
 *
 * @component
 * @returns {JSX.Element} The JSX representation of the SearchBar component.
 */
const SearchBar = ({ podcasts, setFilteredPodcasts }) => {
  const [searchInput, setSearchInput] = useState('');

  const options = {
    keys: ['title'],
    threshold: 0.3, 
  };

  const fuse = new Fuse(podcasts, options);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value) {
      const results = fuse.search(event.target.value);
      setFilteredPodcasts(results.map((result) => result.item));
    } else {
      setFilteredPodcasts([]); // Reset filteredPodcasts to display all podcasts when the search input is empty.
    }
  };

  return (
    <input
      className='search-input'
      placeholder='Search.....'
      type='text'
      value={searchInput}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
