import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchHistory from './SearchHistory';
import SearchPageText from './SearchPageText'; // Import the PromotionalBanner component

function SearchPage({currentSession}) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen border border-gray-300 rounded-md p-4"  style={{ backgroundColor: '#f2f2f2' }}>
      <div className="flex flex-col items-center">
        <SearchPageText />
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>
      <br/>
      <SearchResults searchTerm={searchTerm} currentSession={currentSession}/>
      <br/>
      <SearchHistory currentSession={currentSession}/>
    </div>
  );
}

export default SearchPage;
