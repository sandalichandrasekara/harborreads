import React, { useState, useEffect } from 'react';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'; 

function BookInfo({ bookId, shelf, userId, setShelves, username }) {
  const [bookDetails, setBookDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState('wantToRead');

  useEffect(() => {
    fetch(`http://localhost:3001/library/book/${bookId}`)
      .then(response => response.json())
      .then(details => {
        setBookDetails(details);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [bookId]);

  const handleRemoveBook = () => {
    handleRemoveBookFromShelf(shelf, bookId);
  };

  const handleEditBook = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };


  const handleRemoveBookFromShelf = (shelfIndex, bookToRemoveId) => {
    fetch(`http://localhost:3001/library/removeBookFromShelf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, shelfIndex, bookToRemoveId })
    })
      .then(response => response.json())
      .then(response => {
        const { shelves, defaultShelf } = response;
        const updatedShelves = [...shelves, defaultShelf];
        setShelves(updatedShelves);
      })
      .catch(error => console.error('Error removing book from shelf:', error));
  };

  const handleChangeState = (value) => {
    setShowDropdown(false);
    //onUpdateState(value);
    fetch(`http://localhost:3001/library/changeStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookId, newState: value, username })
    })
      .then(response => response.json())
      .then(updatedDetails => {
        setBookDetails(prevDetails => ({
          ...prevDetails,
          state: updatedDetails.state  // assuming the state is the key for status in the bookDetails object
        }));
      })
      .catch(error => console.error('Error changing book status:', error));
  };

  return (
    <div className="relative ml-0 flex items-center justify-between p-3 rounded-lg shadow bg-white w-70">
      <div className="flex-shrink-0 w-32 h-52 mr-4">
        <img src={bookDetails?.imageUrl} alt={bookDetails?.title} className="h-full w-full object-cover " />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{bookDetails?.title}</h3>
        <p className="text-gray-600 mb-2">by {bookDetails?.author && bookDetails?.author.join(', ')}</p>
        <p className="text-gray-600 mb-2">Genre: {bookDetails?.genre && bookDetails?.genre[0]}</p>
        {bookDetails?.publishedDate && <p className="text-gray-600 mb-2">Year: {new Date(bookDetails?.publishedDate).getFullYear()}</p>}
      </div>
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <button className="text-sm bg-red-500 text-white rounded-full p-1 sm:p-2 lg:p-3" onClick={handleRemoveBook}>
          <FaTrash />
        </button>
        <button className="text-sm bg-blue-500 text-white rounded-full p-1 sm:p-2 lg:p-3" onClick={handleEditBook}>
          <FaPencilAlt />
        </button>
        {showDropdown && (
          <div className="absolute left-0 mt-10">
            <select value={selectedState} onChange={(e) => handleChangeState(e.target.value)}>
              <option value="read">Read</option>
              <option value="reading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookInfo;
