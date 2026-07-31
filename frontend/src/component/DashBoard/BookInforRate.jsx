import React from 'react';

function BookInfo({ book }) {
  // Helper function to generate star icons based on rating
  const renderStarRating = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating); // Round the rating to the nearest integer

    // Add filled star icons based on the rounded rating
    for (let i = 0; i < roundedRating; i++) {
      stars.push(<span key={i} className="text-brown"><span >&#9733;</span></span>); // Filled star icon
    }

    // Add empty star icons for the remaining space
    for (let i = roundedRating; i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300">&#9733;</span>); // Empty star icon
    }

    return stars;
  };

  return (
    <div className="book-container flex-none w-56 m-4 p-4 rounded-md shadow bg-white hover:scale-105 transition-transform duration-300">
      <img src={book.imageUrl} alt={book.title} className="h-48 w-full object-cover rounded-md shadow bg-white" />
      <div className="mt-2">
        <h3 className="text-lg font-semibold" style={{ height: '2rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{book.title}</h3>
        <p className="text-gray-600">{book.authors || 'Unavailable'}</p>
        <p className="text-gray-600 tp-2">Rating: {book.rating ? renderStarRating(book.rating) : 'Unavailable'}</p>
      </div>
    </div>
  );
}

export default BookInfo;
