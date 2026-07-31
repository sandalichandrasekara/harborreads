
// export default BookSection;
import React, { useState, useEffect } from 'react';

const quotes = [
  "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.”    ― Haruki Murakami",
  "Reading furnishes the mind only with materials of knowledge; it is thinking that makes what we read ours.”       ― John Locke",
  "“I think books are like people, in the sense that they’ll turn up in your life when you most need them.”         ― Emma Thompson",
  // Add more quotes here...
];

const QuoteCarousel = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000); // Change quote every 4 seconds

    return () => clearTimeout(timer);
  }, [quoteIndex]);

  return (
    <div className=" flex flex-col items-center p-5  ">
      <div className="w-full rounded-tl-lg rounded-br-lg border border-brown bg-light-brown">
        <p className="text-brown text-white font-semibold text-center p-2">{quotes[quoteIndex]}</p>
      </div>
    </div>
  );
};

export default QuoteCarousel;

