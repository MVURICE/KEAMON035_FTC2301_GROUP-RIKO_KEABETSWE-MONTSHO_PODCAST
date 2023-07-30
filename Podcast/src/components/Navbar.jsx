import React from 'react';
import logo from '../assets/Logo.png';
import SearchBar from './SearchBar';

/**
 * Navbar component represents the navigation bar of the application.
 *
 * @component
 * @returns {JSX.Element} The JSX representation of the Navbar component.
 */
const Navbar = () => {
  return (
    <header>
      <nav className='navbar'>
        <div className='logo-container'>
          <img className='logo' src={logo} alt='Logo' />
        </div>
        <ul className='menu-links'>
          <li>HOME PAGE</li>
          <li>GENRES</li>
          <li>FAVOURITES</li>
        </ul>
        <SearchBar />
      </nav>
    </header>
  );
};

export default Navbar;

