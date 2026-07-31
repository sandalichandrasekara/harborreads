import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Move useNavigate hook inside the component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/leaderboard/getLeaderboard');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      }
    };

    fetchData();
  }, []);

  const handleBackButtonClick = () => {
    navigate('/insights');
  };
  
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 md:p-6 lg:p-8 relative">
      <button
        className="text-black  hover:text-gray-900 absolute top-4 left-4"
        onClick={handleBackButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black" // explicitly set the color to black
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <div className="text-center mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Leaderboard</h2>
      </div>
      <table className="w-full" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="bg-brown text-white">
            <th className="p-2 md:p-3 lg:p-4 border border-white" style={{ width: "50%" }}>User</th>
            <th className="p-2 md:p-3 lg:p-4 border border-white" style={{ width: "50%" }}>Score</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
          <tr key={user._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'} border-b border-gray-300`}>
            <td className="p-2 md:p-3 lg:p-4 flex items-center" style={{ width: "50%" }}>
              <img src={user.imageUrl || 'https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png'} alt={user.username} className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full mr-5" />
              <span className="text-sm md:text-base lg:text-lg">{user.username}</span>
            </td>
            <td className="p-2 md:p-3 lg:p-4 text-black" style={{ width: "50%", textAlign: "center" }}>{user.score}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;