/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookInfo from '../Reusables/BookInfo';

// eslint-disable-next-line react/prop-types
function SearchResults({ searchTerm,currentSession }) {
  const [searchResults, setSearchResults] = useState([]);
  const userId = currentSession.user.id;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    // Fetch search results data from the server
    fetch('http://localhost:3001/books/search/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        title: searchTerm
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setIsLoading(false);
      });
  }, [searchTerm]); // Fetch data whenever the searchTerm changes

  const handleBookClick = (bookId) => {
    navigate(`/bookpre/${bookId}`);
  };

  if (isLoading) {
    return <div className='text-center text-gray-500'>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4 ml-4">Search Results</h2>
      {searchResults.length === 0 ? (
        <div className="text-gray-500 text-center">Enter a query on the search bar to find books</div>
      ) : (
        <div className="overflow-x-auto flex flex-nowrap">
          {searchResults.map((val) => (
            <div key={val.bookId} onClick={() => handleBookClick(val.bookId)}>
              <BookInfo book={val}/>
            </div>
          ))}
        </div>
      )}
      {searchResults.length > 3 && (
        <div className="flex justify-end mt-4">
          <button className="text-white">View All</button>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
