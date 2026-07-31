import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookInforRate from './BookInforRate';
import LoadingBars from '../ProgressBar/loadinglights'

function PopularBooksList() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    // Fetch popular books data from the server
    fetch('http://localhost:3001/books/popular/highly-rated-books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch popular books');
        }
        return response.json();
      })
      .then(data => {
        setPopularBooks(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching popular books:', error);
        setIsLoading(false);
      });
  }, []); // Fetch data only once when the component mounts

  

  const handleBookClick = (bookId) => {
        navigate(`/bookpre/${bookId}`);
      };


  if (isLoading) {
    //return <div className='text-center text-gray-500'>Loading...</div>;
    <LoadingBars/>
  }

  return (
    <div className="max-w-screen-xl mx-auto md:px-0 ">
      {popularBooks.length === 0 ? (
        //<div className="text-gray-500 text-center">No popular books found</div>
        <LoadingBars/>
      ) : (
        <div className="overflow-x-auto flex flex-nowrap ">
          {popularBooks.map(book => (
            <div key={book.bookId} onClick={() => handleBookClick(book.bookId)}>
              <BookInforRate book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PopularBooksList;
