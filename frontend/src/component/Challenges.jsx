import React, { useState } from "react";
import { FaMedal } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Challenges({username}) {
  const [booksToRead, setBooksToRead] = useState("");
  const [readerCategory, setReaderCategory] = useState("");
  const [showQuotes, setShowQuotes] = useState(false);
  

  const handleChange = (event) => {
    const numBooks = parseInt(event.target.value);
    setBooksToRead(numBooks);

    if (numBooks <= 5) {
      setReaderCategory("bronze");
    } else if (numBooks <= 10) {
      setReaderCategory("silver");
    } else {
      setReaderCategory("gold");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Number of books to read:", booksToRead);
    console.log("Reader category:", readerCategory);
    setShowQuotes(true);
  
    try {
      const response = await fetch('http://localhost:3001/insight/setWTRBooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username:username, wantTooReadBooks: booksToRead })
      });
  
      if (!response.ok) {
        throw new Error('Failed to set number of want to read books');
      }
  
      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error, show message, etc.
    }
  };

  const getBoxShadowStyle = (category) => {
    switch (category) {
      case "bronze":
        return {
          boxShadow: "0px 4px 4px 0 rgba(255,234,234,0.25)",
          backgroundColor: "#8C7853",
        };
      case "silver":
        return {
          boxShadow: "0px 4px 4px 0 rgba(255,234,234,0.25)",
          backgroundColor: "#C0C0C0",
        };
      case "gold":
        return {
          boxShadow: "0px 4px 4px 0 rgba(255,234,234,0.25)",
          backgroundColor: "#FFD700",
        };
      default:
        return { boxShadow: "0px 4px 4px 0 rgba(255,234,234,0.25)" };
    }
  };

  const quotes = [
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go." ,"- Dr. Seuss -"
  ];

  return (
    <div className="w-[800px] h-[630px] bg-very-light-maroon rounded-[20px] mx-auto relative" style={{ overflow: "hidden" }}>
      <h1 className="topic-title text-3xl font-serif text-center text-brown mb-4 mt-6" style={{ height: "50px" }}>Challenges into Triumphs</h1>
      <div>
        <Link to="/insights">
          <button className="absolute left-3 top-3 bg-white text-black px-3 py-1 rounded-full">&lt;</button>
        </Link>
        <div className="w-[800px] h-[630px] rounded-[20px] bg-brown-500 mx-auto relative" style={{ boxShadow: "0px 45px 45px 0 rgba(255,234,234,0.25)" }}>
          <div className="p-4 text-brown text-center flex">
            <p className="font-serif text-[18px] text-left w-[350px] mt-10 mb-10">How many books will you read in 2024 ?</p>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                className="border border-gray-300 font-serif rounded-md p-2 mr-2 text-black mt-10 mb-10"
                placeholder="Enter number of books"
                value={booksToRead}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-brown font-serif text-white px-4 py-2 rounded-md hover:bg-gray-700 mt-10 mb-10"
              >
                Submit
              </button>
            </form>
          </div>

          {showQuotes && (
            <div className="flex flex-col justify-center items-center my-6">
              {quotes.map((quote, index) => (
                <p key={index} className="text-brown text-center mb-4">{quote}</p>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <div className="w-[250px] h-[250px] rounded-[20px] p-4 cursor-pointer hover:bg-gray-700 flex flex-col justify-between relative" style={getBoxShadowStyle("bronze")}>
              <div>
                <h2 className="text-white font-serif text-xl font-semibold mb-4">Bronze Reader Challenges</h2>
                <ul className="text-white font-serif h-[10px]">
                  <li>Read 5 books in a month.</li>
                  <li>Finish a book series within a month.</li>
                  <li>Try reading a book from a different genre.</li>
                </ul>
              </div>
              <FaMedal className="text-bronze text-4xl absolute top-0 right-0 m-4" />
            </div>

            <div className="w-[250px] h-[250px] rounded-[20px] p-4 cursor-pointer hover:bg-gray-700 flex flex-col justify-between relative" style={getBoxShadowStyle("silver")}>
              <div>
                <h2 className="text-white font-serif text-xl font-semibold mb-4">Silver Reader Challenges</h2>
                <ul className="text-white font-serif h-[10px]">
                  <li>Read 10 books in a month.</li>
                  <li>Join a book club and discuss books weekly.</li>
                  <li>Read a classic novel.</li>
                </ul>
              </div>
              <FaMedal className="text-silver text-4xl absolute top-0 right-0 m-4" />
            </div>

            <div className="w-[250px] h-[250px] rounded-[20px] p-4 cursor-pointer hover:bg-gray-700 flex flex-col justify-between relative" style={getBoxShadowStyle("gold")}>
              <div>
                <h2 className="text-white font-serif text-xl font-semibold mb-4">Gold Reader Challenges</h2>
                <ul className="text-white font-serif h-[10px]">
                  <li>Read 15 books in a month.</li>
                  <li>Write book reviews for each book read.</li>
                  <li>Complete a reading challenge with a friend.</li>
                </ul>
              </div>
              <FaMedal className="text-gold text-4xl absolute top-0 right-0 m-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
