// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import logo from '../assets/Logo.png';
import SearchBar from './SearchBar';
import genreNames from '../GenresNames'; // Make sure to import your genre data

const Navbar = ({ podcasts, setFilteredPodcasts, homePage, handleGenreFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState('0'); // Initialize with default value

  const handleGenreChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGenre(selectedValue);
    handleGenreFilter(selectedValue); // Call the filter function on genre change
  };

  const handleFavouritesClick = () => {
    console.log('You clicked favorites');
    // Implement your logic for handling favorites click
  };

  return (
    <header>
      <nav className='navbar'>
        <div className='logo-container'>
          <img className='logo' src={logo} alt='Logo' />
        </div>
        <ul className='menu-links'>
          <li onClick={homePage}>HOME PAGE</li>
          <li>
            <label htmlFor='genres'>GENRES:</label>
            <select id='genres' onChange={handleGenreChange} value={selectedGenre}>
              <option value='0'>Select a genre</option>
              {Object.keys(genreNames).map((key) => (
                <option key={key} value={key}>
                  {genreNames[key]}
                </option>
              ))}
            </select>
          </li>
          <li onClick={handleFavouritesClick}>FAVOURITES</li>
        </ul>
        <SearchBar podcasts={podcasts} setFilteredPodcasts={setFilteredPodcasts} />
      </nav>
    </header>
  );
};

export default Navbar;
