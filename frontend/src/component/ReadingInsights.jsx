import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Quiz from './QuizData/QuizPage';

const CircularProgress = ({ percentage, color }) => {
  const strokeWidth = 15;
  const size = 100; // Change the size as needed
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full" style={{ maxWidth: `${size}px` }}>
      <svg height={size} width={size} className="absolute top-0 left-0">
        <circle
          stroke="#B82E1F" // Outer border color
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
        />
        <circle
          stroke={color} // Inner progress color
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={radius}
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fill="black"
          className="font-bold"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

const ReadingInsights = ({ username }) => {
  const [numberOfReadBooks, setNumberOfReadBooks] = useState(0);
  const [wantToReadBooks, setWantToReadBooks] = useState(0);

  useEffect(() => {
    const fetchNumberOfReadBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/insight/getNoOfReadBooks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username })
        });
        const data = await response.json();
        setNumberOfReadBooks(data.numberOfReadBooks);
      } catch (error) {
        console.error('Error fetching number of read books:', error);
      }
    };

    const fetchWantToReadBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/insight/getWTRBooks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username })
        });
        const data = await response.json();
        setWantToReadBooks(data.wantTooReadBooks);
      } catch (error) {
        console.error('Error fetching number of want to read books:', error);
      }
    };

    fetchNumberOfReadBooks();
    fetchWantToReadBooks();
  }, [username]);

  const readBooksPercentage = Math.round((numberOfReadBooks / wantToReadBooks) * 100);

  return (
    <div className="reading-insights-container justify-between rounded-[20px] mx-auto relative" style={{ marginBottom: "10px", textAlign: "center", overflow: "hidden", padding: "20px" }}>
      <div className="bg-very-light-maroon rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center" style={{ marginBottom: "10px", textAlign: "center", overflow: "hidden", padding: "20px", backgroundImage: 'linear-gradient(45deg, #ee9ca7 0%, #ffdde1 100%)' }}>

            <h2 className="font-bold md:text-base lg:text-xl mt-2 mb-3 mr-10">Your Literary Milestone <span role="img" aria-label="trophy">🏆</span></h2>
            <div className="progress-circle" style={{ width: "120px", height: "120px" }}>
                <CircularProgress percentage={readBooksPercentage} color="#ff6600" radius={60} strokeWidth={10} />
            </div>
            <div className="flex-grow mb-4 md:mb-0 ">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between border-b-2 border-gray-400 mb-2 ml-5 mr-2">
                  <p className="text-lg font-semibold text-black">Year</p>
                  <p className="text-lg font-semibold text-black">Books Read</p>
                </div>
                <div className="flex flex-row justify-between">
                  <p className="text-lg font-bold text-black ml-5">2023</p>
                  <p className="text-lg font-bold text-black ml-5 mr-2">{numberOfReadBooks}/{wantToReadBooks} </p>

                </div>
              </div>
            </div>
           
      </div>
      <div className="flex flex-wrap justify-between container mx-auto ">
        <div className="bg-very-light-maroon rounded-lg mt-2  shadow-md p-4 md:flex items-center mb-6 md:w-[48%] md:mr-1 md:justify-start">
          <div className="md:mr-2">
            <div> <img src="https://png.pngtree.com/png-vector/20220409/ourlarge/pngtree-concentration-and-focus-on-business-goal-or-target-business-goal-solution-png-image_4503525.png"/></div>
            <h3 className="font-semibold md:text-base lg:text-xl mt-2  mb-3">Challenge Your Knowledge!</h3>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4">Dive into a world of literary exploration and challenge your literary prowess today!</p>
            <Link to="/Quiz" className="bg-brown text-white px-2 py-2 rounded-lg items-center mt-2 block">
              Explore Quizzes
              <span className="ml-2">&#10132;</span>
            </Link>
          </div>
        </div>  
        <div className="bg-very-light-maroon rounded-lg shadow-md mt-2 p-4 md:flex items-center mb-6 md:w-[48%] md:mr-1 md:justify-start">
          <div className="md:mr-2">
            <div><img src="https://img.resized.co/siliconrepublic/eyJkYXRhIjoie1widXJsXCI6XCJodHRwczpcXFwvXFxcL3d3dy5zaWxpY29ucmVwdWJsaWMuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDIyXFxcLzA5XFxcL2dvYWwtc2V0dGluZy5qcGVnXCIsXCJ3aWR0aFwiOjExMDAsXCJoZWlnaHRcIjo2MDAsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL3d3dy5zaWxpY29ucmVwdWJsaWMuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE0XFxcLzEyXFxcLzIwMTMwMlxcXC9wdXp6bGUuanBnXCIsXCJvcHRpb25zXCI6W119IiwiaGFzaCI6ImZjZWJhMzU0MTUwNzQzNzRkNTBjMWUyYTM5MWY1MGU4Zjg5ZGFkNjYifQ==/goal-setting.jpeg" className="h-24 md:h-auto" /></div>
            <h3 className="font-semibold md:text-base lg:text-xl mt-2  mb-3">Set a Challenge</h3>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4">Set a goal for the number of books you want to read and track your progress</p>
            <Link to="/challenges" className="bg-brown text-white px-2 py-2 rounded-lg items-center mt-2 block">
              Set a challenge
              <span className="ml-2">&#10132;</span>
            </Link>
          </div>
        </div>
      </div>    

      <div className="flex flex-wrap justify-between">
      <div className="flex flex-wrap justify-between">
      <div className="flex flex-wrap justify-between">
      <div className="bg-very-light-maroon rounded-lg shadow-md p-4 md:flex items-center mb-10 mt-2 md:w-[48%] md:mr-1">
        <div className="md:mr-2">
          <div> <img src="https://news.miami.edu/life/_assets/images/images-stories/2021/01/book-clubs-940x529.jpg"/></div>
          <h2 className="font-semibold md:text-base lg:text-xl mt-2  mb-3">Explore Reading Communities</h2>
          <p className="text-lg  text-gray mb-2">Connect with other book lovers and join discussions on Goodreads!</p>
          <a href="https://www.goodreads.com/group" target="_blank" rel="noreferrer" className="bg-brown text-white px-2 py-2 rounded-lg items-center mt-2 block">Explore Reading Communities</a>
        </div>
      </div>
      <div className="bg-very-light-maroon rounded-lg shadow-md p-4 md:flex items-center mb-10 md:w-[48%] mt-2" >
        <div className="md:mr-4">
          <div><img src= "https://www.elevate.so/content/images/2023/03/2201_w037_n003_114a_p1_114.jpg"/></div>
          <h2 className="font-semibold md:text-base lg:text-xl mt-2  mb-3">View Leaderboard</h2>
          <p className="text-lg  text-gray mb-2">Check out the top readers on HarborReads!</p>
          <Link to="/Leaderboard" className="bg-brown text-white px-2 py-2 rounded-lg items-center mt-2 block">View Leaderboard</Link>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default ReadingInsights;
