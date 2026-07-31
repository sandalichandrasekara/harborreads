/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookInfo from '../Reusables/BookInfo'; 
import LoadingBars from '../ProgressBar/loadinglights'

function SearchHistory({currentSession}) {
  const [searchHistory, setSearchHistory] = useState([]);
  console.log(currentSession);
  const userId = currentSession.user.id;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch search history data from the server
    fetch('http://localhost:3001/books/search/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch search history');
        }
        return response.json();
      })
      .then(data => {
        console.log('Search history data:', data);
        setSearchHistory(data.searchHistory);
      })
      .catch(error => {
        console.error('Error fetching search history:', error);
      });
  }, []); // Empty dependency array to run effect only once

  const handleBookClick = (bookId) => {
    navigate(`/bookpre/${bookId}`);
  };


  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4 ml-4">Search History</h2>
      {searchHistory.length === 0 ? (
        // <div className="text-gray-500 ml-4">No search history found</div>
        <LoadingBars/>
      ) : (
        <div className="overflow-x-auto flex flex-nowrap">
          {searchHistory.map((val) => (
             <div key={val.bookId} onClick={() => handleBookClick(val.bookId)}>
            <BookInfo book={val}/>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchHistory;
