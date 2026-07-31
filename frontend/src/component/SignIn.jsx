import React, { useState } from 'react';
import logo from '../assets/newLogoo.png';
import backgroundImage from '../assets/landingBg.png'; // Path to your background image

const SignIn = ({ handleSignIn, signinMsg, setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignIn(username, password);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // 30 seconds
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-cover" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <img src={logo} className="h-16 md:h-20 mx-auto mb-8" alt="Logo" />
        <h2 className="text-center font-bold text-2xl md:text-3xl text-gray-800 mb-4">Discover Books You'll Love!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-lg block w-full px-3 py-2.5 placeholder-gray-500 text-gray-800"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded-lg block w-full px-3 py-2.5 placeholder-gray-500 text-gray-800"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 text-white font-medium rounded-lg text-sm md:text-base px-5 py-3 w-full"
            style={{ backgroundColor: "#22c55e" }}
          >
            Sign In
          </button>
        </form>
        {showMessage && (
          <p className="text-center text-red-500 text-sm mt-4">{signinMsg}</p>
        )}
        <div className="text-center mt-4">
          <p className="text-gray-800">New to HarborReads?</p>
          <button className="font-bold text-blue-500 hover:text-blue-600" onClick={() => setAuth('signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
