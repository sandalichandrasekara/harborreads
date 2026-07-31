import React, { useState, useEffect } from 'react';
import BookInfo from './bookContainers';
import './personalLibrary.css'; 
import { FaTimes } from 'react-icons/fa'; // Import the "X" icon
import { FaPlus } from 'react-icons/fa'; // Import the plus icon

function Personallib({ currentSession, username }) {
  const [shelves, setShelves] = useState([]);
  const [shelfName, setShelfName] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeShelf, setActiveShelf] = useState(null);
  const userId = currentSession.user.id;

  useEffect(() => {
    fetchUserShelves();
  }, []);

  const fetchUserShelves = () => {
    fetch(`http://localhost:3001/library/shelves`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(response => {
      const { shelves, defaultShelf } = response;
      let updatedShelves = shelves;

      if (defaultShelf) {
        setActiveShelf(defaultShelf);
      }
  
      if (defaultShelf) {
        // Check if the default shelf is already in the shelves array
        const defaultShelfIndex = shelves.findIndex(shelf => shelf._id === defaultShelf._id);
  
        if (defaultShelfIndex === -1) {
          // If not, add it to the beginning of the shelves array
          updatedShelves = [defaultShelf, ...shelves];
        }
      }
  
      setShelves(updatedShelves);
    })
    .catch(error => console.error('Error fetching user shelves:', error));
  };


  const handleAddShelf = () => {
    if (shelfName.trim() !== '') {
      fetch(`http://localhost:3001/library/addShelf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, shelfName })
      })
      .then(response => response.json())
      .then(() => {
        setShelves([...shelves, { name: shelfName, books: [] }]);
        setShelfName('');
      })
      .catch(error => console.error('Error adding shelf:', error));
    }
  };

  const handleRemoveShelf = (index) => {
    const shelfId = shelves[index]._id;
    fetch(`http://localhost:3001/library/removeShelf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, shelfId })
    })
    .then(response => response.json())
    .then(() => {
      const newShelves = [...shelves];
      newShelves.splice(index, 1);
      setShelves(newShelves);
    })
    .catch(error => console.error('Error removing shelf:', error));
  };

  // const handleUpdateBookState = (shelfIndex, bookToUpdate, newState) => {
  //   const updatedShelves = shelves.map((shelf, index) => {
  //     if (index === shelfIndex) {
  //       return {
  //         ...shelf,
  //         books: shelf.books.map(book => {
  //           if (book === bookToUpdate) {
  //             return {
  //               ...book,
  //               state: newState
  //             };
  //           }
  //           return book;
  //         })
  //       };
  //     }
  //     return shelf;
  //   });
  //   setShelves(updatedShelves);
  // };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filterBooksByShelf = (shelfName) => {
    let filteredBooks = [];
    shelves.forEach((shelf) => {
      if (shelf && shelf.name === shelfName || shelfName === 'All') {
        if (Array.isArray(shelf.books)) {
          filteredBooks = [...filteredBooks, ...shelf.books];
        }
      }
    });
    
    if (selectedFilter !== 'All') {
      filteredBooks = filteredBooks.filter((book) => book.state === selectedFilter);
    }
    return filteredBooks;
  };

  const handleShelfClick = (shelf) => {
    setActiveShelf(shelf);
  };

  return (
    <div className=" bg-gray-100 ">
      <div className="rounded-lg shadow-md p-2 items-center ">
      <h1 className='flex justify-center mt-2 items-center flex-col text-4xl font-semibold text-black mb-8 typing-animation' style={{ lineHeight: '1.5', marginBottom: '1rem' }}>
        <span className="text-center">
        <span className="text-brown">{username}'s </span>
        <span className="text-brown-300">reads</span> ✨
        </span>
      </h1>
        <div className="flex justify-center mt-5">
          <input
            className='text-black bg-gray-200 rounded-xl mr-2 pl-2 py-1 w-1/4'
            placeholder='Enter your new shelf name'
            value={shelfName}
            onChange={(e) => setShelfName(e.target.value)}
          />
          <button
            className='text-white bg-brown rounded-full w-45 ml-2 mr-2 px-2 py-1'
            onClick={handleAddShelf}
          > 
              <FaPlus className="text-lg" /> {/* Plus icon */}
          </button>
          <select
            className='text-black bg-gray-200 rounded-xl pl-2 pr-4 py-1 ml-2'
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Read">Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Want to Read">Want to Read</option>
          </select>
        </div>
        <div className='bg-'>
        <div className="bg-brown h-1 w-full mb-4 mt-3"></div>
        <div className="mt-4">
        <div className="flex justify-center flex-wrap">
          {shelves.map((shelf, shelfIndex) => (
            <div
              key={shelfIndex}
              className={`cursor-pointer mx-2 mb-2 ${activeShelf === shelf ? 'bg-light-brown text-white' : 'bg-gray-200 text-black'} 
                          py-2 px-5 rounded-lg shadow-md hover:bg-light-brown`}
              onClick={() => handleShelfClick(shelf)}
            >
              {shelf.name}
            </div>
          ))}
        </div>
      </div>
        <div className="bg-brown h-1 w-full mb-4 mt-4"></div>
        </div>
        <div className="mt-4 pr-1 ">
          {activeShelf && (
           <div className="bg-nav-bg rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-2 text-black mb-4 ml-4 font-semibold capitalize hover:text-brown transition duration-300">
              {activeShelf.name}
            </h2>
              <button
                className="text-sm bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleRemoveShelf(shelves.indexOf(activeShelf))}
              >
                <FaTimes /> {/* Use the "X" icon */}
              </button>
            </div>
              <div className="flex flex-wrap  ">
                {filterBooksByShelf(activeShelf.name).map((book, bookIndex) => (
                  <div key={bookIndex} className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-2" >
                    <div className="rounded-lg p-2 " >
                      <BookInfo
                        bookId={book}
                        shelf={activeShelf}
                        userId={userId}
                        setShelves={setShelves}
                        //onUpdateState={(newState) => handleUpdateBookState(shelves.indexOf(activeShelf), book, newState)}
                        username={username}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
              }
export default Personallib;
