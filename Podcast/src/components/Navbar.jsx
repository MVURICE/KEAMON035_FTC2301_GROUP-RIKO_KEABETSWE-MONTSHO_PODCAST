// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import logo from '../assets/Logo.png';
import SearchBar from './SearchBar';

const genres = {
  1: 'Personal Growth',
  2: 'True Crime and Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

const Navbar = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGenre(selectedValue !== '0' ? selectedValue : null);
    // Perform filtering or other actions based on the selected genre
    // For example: props.filterByGenre(selectedValue);
  };

  const handleFavouritesClick = () => {
    console.log('you clicked favourites');
  };

  return (
    <header>
      <nav className='navbar'>
        <div className='logo-container'>
          <img className='logo' src={logo} alt='Logo' />
        </div>
        <ul className='menu-links'>
          <li onClick={props.homePage}>HOME PAGE</li>
          <li>
            <label htmlFor='genres'>GENRES:</label>
            <select id='genres' onChange={handleGenreChange} value={selectedGenre || '0'}>
              <option value='0'>Select a genre</option>
              {Object.keys(genres).map((key) => (
                <option key={key} value={key}>
                  {genres[key]}
                </option>
              ))}
            </select>
          </li>
          <li onClick={handleFavouritesClick}>FAVOURITES</li>
        </ul>
        <SearchBar podcasts={props.podcasts} setFilteredPodcasts={props.setFilteredPodcasts} />
      </nav>
    </header>
  );
};

export default Navbar;
