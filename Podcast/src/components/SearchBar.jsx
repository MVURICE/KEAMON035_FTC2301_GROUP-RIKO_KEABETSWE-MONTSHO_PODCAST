/**
 * SearchBar component represents an input field for searching within the application.
 *
 * @component
 * @returns {JSX.Element} The JSX representation of the SearchBar component.
 */
const SearchBar = () => {

  const handleSearchChange = (event) => {
    event.preventDefault();
    const searchInput = event.target.value;
    // Do something with the searchInput, like filtering search results.
    // console.log(searchInput);
  };

  return (
    <input
      className='search-input'
      placeholder='Search.....'
      type='text'
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
