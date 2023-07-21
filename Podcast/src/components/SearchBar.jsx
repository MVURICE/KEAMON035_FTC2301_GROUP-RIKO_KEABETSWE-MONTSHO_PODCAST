
import React from "react";

export default function SearchBar() {


    function handleSearchChange(event){
        event.preventDefault()
        const searchInput = event.target.value
        
        // console.log(searchInput)
     
      }

    
  
    return (
      <input
        className='search-input'
        placeholder='Search.....'
        type='text'
        onChange={handleSearchChange}
      />
    );
  }
  