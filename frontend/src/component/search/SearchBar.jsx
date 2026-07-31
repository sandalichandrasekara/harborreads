import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Import an icon from a library like React Icons

function SearchBar({ setSearchTerm }) {
  const [searchBar, setSearchBar] = useState('');

  const handleSearchClick = () => {
    setSearchTerm(searchBar);
  };

  return (
    <div className='relative mt-5 mx-auto flex items-center'>
      {/* Search input */}
      <div className='relative flex items-center mr-0 w-full sm:w-auto'>
        <input
          className='input w-full sm:w-80 h-[40px] rounded-l-full pl-10 border border-brown'
          type='text'
          placeholder='Search for books'
          onChange={(event) => setSearchBar(event.target.value)}
        />
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <FiSearch className='text-gray-500' />
        </div>
      </div>
      {/* Search button */}
      <button
        className='bg-light-brown text-white rounded-r-full px-4 h-[40px] sm:ml-0 mt-2 sm:mt-0 transition-colors duration-300 ease-in-out hover:bg-brown'
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
