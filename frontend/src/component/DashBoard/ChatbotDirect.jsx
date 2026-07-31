import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import chatbotImage from '../../assets/chatbotImg.png';

const Chatbot = () => {
  return (
    <div className="container   md:px-0 flex items-center">
      <div className="bg-very-light-maroon rounded-lg shadow-md p-4 flex items-center">
        <div className="mr-4"> {/* Margin right for spacing */}
          <h3 className="text-xl md:text-base lg:text-3xl mb-3">Get Personalized Recommendations</h3>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4 " >Discover your next favorite book with our friendly chatbot! Whether you're into thrillers, romance, or sci-fi, we'll tailor recommendations just for you. Start chatting now and dive into a world of captivating reads!</p>
          <Link to="/chatbot" className="bg-brown text-white px-2 py-2 rounded-lg  items-center mt-5  md-2"> {/* Link to Chatbot page */}
          {/* Link to Chatbot page */}
            Let's start chatting
            <span className="ml-2 ">&#10132;</span> {/* Arrow character */}
          </Link>
        </div>
        <div> {/* Image container */}
          <img src={chatbotImage} alt="Chatbot" className="w-74 h-55" /> {/* Adjust size as needed */}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;