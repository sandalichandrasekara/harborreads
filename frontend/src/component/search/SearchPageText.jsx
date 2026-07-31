import React from 'react';
import { FaBookOpen } from 'react-icons/fa'; // Import an icon from React Icons
import './searchPage.css'; // Import your CSS file

function SearchPageText() {
  return (
    <div className="flex items-center mb-4 mt-5">
      <FaBookOpen className="md:text-5xl md:mr-4 text-brown" /> {/* Add an icon */}
      <p className="md:text-3xl text-black font-semibold text-gray-800 typing-animation">
        Discover Your Next Adventure
      </p>
    </div>
  );
}

export default SearchPageText;
