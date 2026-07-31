import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function BookPreview({ goBack, currentSession }) {
  const [bookDetails, setBookDetails] = useState(null);
  const [selectedShelf, setSelectedShelf] = useState('');
  const [userShelves, setUserShelves] = useState([]);
  const [isAdded, setIsAdded] = useState(false); 
  const { bookId } = useParams();
  const userId = currentSession.user.id;

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookDetails();
    fetchUserShelves();
  }, [bookId]); // Fetch data whenever the bookId changes

  const handlegoback=()=>{
    navigate('/');
  };

  const fetchUserShelves = () => {
    fetch(`http://localhost:3001/library/shelves`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user shelves');
        }
        return response.json();
      })
      .then(data => {
        let shelves = [];
        if (data.defaultShelf) {
          shelves.push(data.defaultShelf);
        }
        if (data.shelves) {
          shelves = [...shelves, ...data.shelves];
        }
        setUserShelves(shelves);
      })
      .catch(error => {
        console.error('Error fetching user shelves:', error);
      });
  };

  const fetchBookDetails = () => {
    fetch('http://localhost:3001/books/search/preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bookId,
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        return response.json();
      })
      .then(data => {
        setBookDetails(data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  };

  const handleAddToShelf = () => {
    if (selectedShelf) {
      fetch('http://localhost:3001/library/addBookToShelf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          shelfId: selectedShelf,
          bookDetails: bookDetails,
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add book to shelf');
          }
          setIsAdded(true); // Update state to indicate the book has been added
        })
        .catch(error => {
          console.error('Error adding book to shelf:', error);
        });
    }
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  function BookDescription({ description }) {
    return (
      <div className="overflow-y-auto">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    );
  }

  // Function to display rating as stars
  const displayStars = (rating) => {
    const numStars = Math.round(rating);
    const goldStar = '★';
    const emptyStar = '☆';
    const goldStars = goldStar.repeat(numStars);
    const emptyStars = emptyStar.repeat(5 - numStars);
    return (
      <span>
        <span style={{ color: 'gold' }}>{goldStars}</span>
        <span style={{ color: 'gray' }}>{emptyStars}</span>
      </span>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-brown-600">
      <div className="p-4">
        <button onClick={handlegoback} className="hover:text-gray text-black">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        </button>
      </div>
      <div className="flex-1">
      <div className="h-4 bg-brown"></div>
        <div className=" bg-very-light-maroon grid grid-cols-2 gap-10 p-4 border border-gray-200 rounded shadow-md" style={{ gridTemplateColumns: '25% auto' }}>
          <div>
            <img src={bookDetails.imageUrl} alt={bookDetails.title} className="w-full h-auto rounded-tr-xl rounded-br-xl" />
          </div>
          <div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{bookDetails.title}</h2>
              <p className="text-l text-gray-600  mb-2">Authors: {bookDetails.authors.join(', ')}</p>
              <p className="text-l text-gray-600  mb-2">Rating: {displayStars(bookDetails.rating)}</p>
              <p className="text-l text-gray-600  mb-2">Genre: {bookDetails.genre}</p>
              <p className="text-l text-gray-600  mb-2">Page Count: {bookDetails.pageCount}</p>
              <p className="text-l text-gray-600  mb-2">Year: {bookDetails.year}</p>
              <br />
              {!selectedShelf ? (
                <select className="border border-brown-600 bg-light-brown  text-white p-2 rounded" value={selectedShelf} onChange={(e) => setSelectedShelf(e.target.value)}>
                  <option value="">Select a Shelf</option>
                  {userShelves.map((shelf) => (
                    <option key={shelf._id} value={shelf._id}>{shelf.name}</option>
                  ))}
                </select>
              ) : (
                <button className="bg-brown hover:bg-brown-200 text-white font-bold py-2 px-4 rounded self-end" onClick={handleAddToShelf}>{isAdded ? "Added" : "Add to Shelf"}</button>
              )}
            </div>
          </div>
        </div>
        <div className="h-4 bg-brown"></div>
        <div className="overflow-y-auto bg-very-light-maroon p-4 rounded-b-md">
          <BookDescription description={bookDetails.description} />
        </div>
        
      </div>
    </div>
  );

}

export default BookPreview;
